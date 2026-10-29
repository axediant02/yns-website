import { useEffect, useState } from 'react'
import { previewCatalog } from './preview-catalog'
import { cmsPreviewOrigin, previewChannel } from './preview-validation'
import { validateSitePreview } from './site-preview-model'

export function usePreviewBridge() {
  const [draft, setDraft] = useState(null)
  const origin = cmsPreviewOrigin()
  useEffect(() => {
    if (!origin || window.parent === window) return
    let session = null
    function receive(event) {
      const data = event.data
      if (event.origin !== origin || event.source !== window.parent || data?.channel !== previewChannel) return
      if (data.type === 'hello' && typeof data.session === 'string' && data.session.length <= 100) {
        session = data.session
        window.parent.postMessage({ channel: previewChannel, type: 'ready', session, catalog: previewCatalog }, origin)
      }
      if (data.type !== 'render-site' || !session || data.session !== session || typeof data.requestId !== 'string' || data.requestId.length > 100) return
      const next = validateSitePreview(data.active, data.patches)
      if (next) setDraft({ ...next, session, requestId: data.requestId })
      else window.parent.postMessage({ channel: previewChannel, type: 'invalid', session, requestId: data.requestId }, origin)
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [origin])
  useEffect(() => {
    if (draft && origin) window.parent.postMessage({ channel: previewChannel, type: 'rendered', session: draft.session, requestId: draft.requestId }, origin)
  }, [draft, origin])
  return { draft, configured: Boolean(origin) }
}

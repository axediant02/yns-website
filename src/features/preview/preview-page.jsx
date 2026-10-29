import { useEffect } from 'react'
import FullWebsitePreview from './full-website-preview'
import { usePreviewBridge } from './use-preview-bridge'
import '../../App.css'
import './preview.css'

export default function PreviewPage() {
  const { draft, configured } = usePreviewBridge()
  useEffect(() => {
    document.title = 'Unsaved content preview | YNS D6'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow, noarchive'
    document.head.append(robots)
    return () => robots.remove()
  }, [])
  return (
    <div className="site-shell cms-preview">
      {draft ? <FullWebsitePreview snapshot={draft} /> : <p role="status" className="p-6">{configured ? 'Choose content in the CMS editor to preview it here.' : 'The CMS preview origin is not configured.'}</p>}
    </div>
  )
}

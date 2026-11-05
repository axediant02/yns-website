import { useEffect } from 'react'

import { getPageMeta } from '@/lib/page-meta'

/** Applies page metadata and scroll position whenever the route changes. */
function usePageMeta({ type, slug, eventId, anchor }) {
  useEffect(() => {
    const { title, description } = getPageMeta({ type, slug, eventId })

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)

    if (type !== 'home') {
      // Jump instantly so the page transition reveals the new page from its top.
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (anchor) {
      window.requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: 'start' }))
    }
  }, [type, slug, eventId, anchor])
}

export default usePageMeta

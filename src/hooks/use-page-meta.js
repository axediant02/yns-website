import { useEffect } from 'react'

import { getPageMeta } from '@/lib/page-meta'

/** Applies page metadata and scroll position whenever the route changes. */
function usePageMeta({ type, slug, eventId, anchor }) {
  useEffect(() => {
    const { title, description } = getPageMeta({ type, slug, eventId })

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)

    if (type !== 'home') {
      window.scrollTo(0, 0)
    } else if (anchor) {
      window.requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: 'start' }))
    }
  }, [type, slug, eventId, anchor])
}

export default usePageMeta

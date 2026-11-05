import { useEffect } from 'react'

import { isPlainLeftClick, navigateTo } from '@/lib/site-route'

function getLinkUrl(event) {
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
  if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return null

  const url = new URL(anchor.href, window.location.href)
  return url.origin === window.location.origin ? url : null
}

/**
 * Turns plain same-origin links to other site pages into client-side
 * navigation, so every page switch keeps state and plays the page transition.
 * A link to the current page (such as Home on the homepage) returns to the top.
 */
function useClientNavigation() {
  useEffect(() => {
    const handleClick = (event) => {
      if (!isPlainLeftClick(event)) return

      const url = getLinkUrl(event)
      if (!url) return

      if (url.pathname !== window.location.pathname) {
        event.preventDefault()
        navigateTo(`${url.pathname}${url.search}${url.hash}`)
        return
      }

      // Same-page hash links stay native so anchors and hash routes keep working.
      if (url.hash) return

      event.preventDefault()
      if (window.location.hash) navigateTo(`${url.pathname}${url.search}`)
      window.scrollTo({ top: 0 })
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])
}

export default useClientNavigation

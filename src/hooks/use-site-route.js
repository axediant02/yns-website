import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { runPageTransition } from '@/lib/page-transition'
import { getRouteKey, resolveSiteRoute } from '@/lib/site-route'

function readRoute() {
  return resolveSiteRoute(window.location.pathname, window.location.hash)
}

/**
 * Tracks the client route across hash changes and history navigation.
 * Page changes animate through a view transition; in-page anchors do not.
 */
function useSiteRoute() {
  const [route, setRoute] = useState(readRoute)
  const routeKeyRef = useRef(getRouteKey(route))

  useEffect(() => {
    const handleChange = () => {
      const nextRoute = readRoute()
      const nextKey = getRouteKey(nextRoute)
      const isPageChange = nextKey !== routeKeyRef.current

      routeKeyRef.current = nextKey

      if (isPageChange) {
        runPageTransition(() => flushSync(() => setRoute(nextRoute)))
      } else {
        setRoute(nextRoute)
      }
    }

    window.addEventListener('hashchange', handleChange)
    window.addEventListener('popstate', handleChange)

    return () => {
      window.removeEventListener('hashchange', handleChange)
      window.removeEventListener('popstate', handleChange)
    }
  }, [])

  return route
}

export default useSiteRoute

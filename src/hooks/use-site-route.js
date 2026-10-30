import { useEffect, useState } from 'react'

import { resolveSiteRoute } from '@/lib/site-route'

function readRoute() {
  return resolveSiteRoute(window.location.pathname, window.location.hash)
}

/** Tracks the client route across hash changes and history navigation. */
function useSiteRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const handleChange = () => setRoute(readRoute())

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

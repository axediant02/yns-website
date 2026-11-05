import { useEffect, useState } from 'react'

import { getCountdownParts, getNextGathering } from '@/utils/next-gathering'

/** Live countdown to the next weekly gathering, updated once per second. */
function useNextGathering() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const gathering = getNextGathering(now)

  return {
    ...gathering,
    countdown: getCountdownParts(gathering.start.getTime() - now.getTime()),
  }
}

export default useNextGathering

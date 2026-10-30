import { useCallback, useEffect, useState } from 'react'

import { prefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

const STORAGE_KEY = 'yns-d6-intro-seen'
export const INTRO_DURATION = 2600
const EXIT_DURATION = 900

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // Storage can be unavailable in private modes; the intro simply replays.
  }
}

/**
 * Controls the once-per-session intro.
 * phase: 'playing' → 'exiting' → 'done'. Reduced-motion visitors skip it entirely.
 */
function useIntro() {
  const [phase, setPhase] = useState(() => (prefersReducedMotion() || hasSeenIntro() ? 'done' : 'playing'))

  const skip = useCallback(() => setPhase((current) => (current === 'playing' ? 'exiting' : current)), [])

  useEffect(() => {
    if (phase === 'done') return undefined

    rememberIntro()
    document.documentElement.style.overflow = 'hidden'

    const timer = window.setTimeout(
      () => setPhase(phase === 'playing' ? 'exiting' : 'done'),
      phase === 'playing' ? INTRO_DURATION : EXIT_DURATION,
    )

    return () => {
      window.clearTimeout(timer)
      document.documentElement.style.overflow = ''
    }
  }, [phase])

  return { phase, isReady: phase !== 'playing', skip }
}

export default useIntro

import { useCallback, useEffect, useState } from 'react'

import { prefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

// Keep in step with the intro timings in App.css.
export const INTRO_DURATION = 4400
const EXIT_DURATION = 1200

/**
 * Controls the intro that plays on every site visit or full reload; client-side
 * page switches do not replay it. Escape or the skip button ends it early.
 * phase: 'playing' → 'exiting' → 'done'. Reduced-motion visitors skip it entirely.
 */
function useIntro() {
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 'done' : 'playing'))

  const skip = useCallback(() => setPhase((current) => (current === 'playing' ? 'exiting' : current)), [])

  useEffect(() => {
    if (phase === 'done') return undefined

    document.documentElement.style.overflow = 'hidden'

    const timer = window.setTimeout(
      () => setPhase(phase === 'playing' ? 'exiting' : 'done'),
      phase === 'playing' ? INTRO_DURATION : EXIT_DURATION,
    )
    const handleKeyDown = (event) => event.key === 'Escape' && skip()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
      document.documentElement.style.overflow = ''
    }
  }, [phase, skip])

  return { phase, isReady: phase !== 'playing', skip }
}

export default useIntro

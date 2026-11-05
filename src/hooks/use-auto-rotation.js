import { useCallback, useEffect, useRef, useState } from 'react'

import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion'

/**
 * Steps through `count` items every `interval` ms. It only advances while the
 * container is on screen, not hovered or focused, and not paused; reduced
 * motion turns auto-advance off. Manual navigation restarts the interval.
 */
function useAutoRotation(count, { interval = 9000 } = {}) {
  const containerRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isHeld, setIsHeld] = useState(false)
  // Without IntersectionObserver, treat the container as always on screen.
  const [isInView, setIsInView] = useState(() => !('IntersectionObserver' in window))
  const reducedMotion = usePrefersReducedMotion()

  const isPlaying = !reducedMotion && !isUserPaused && count > 1
  const isAdvancing = isPlaying && !isHeld && isInView
  const activeIndex = count ? index % count : 0

  useEffect(() => {
    const element = containerRef.current
    if (!element || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAdvancing) return undefined

    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), interval)

    return () => window.clearTimeout(timer)
  }, [isAdvancing, activeIndex, count, interval])

  const goTo = useCallback((next) => setIndex(count ? (next + count) % count : 0), [count])
  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])
  const previous = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])
  const togglePlay = useCallback(() => setIsUserPaused((paused) => !paused), [])

  const holdProps = {
    onMouseEnter: () => setIsHeld(true),
    onMouseLeave: () => setIsHeld(false),
    onFocus: () => setIsHeld(true),
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsHeld(false)
    },
  }

  return { containerRef, index: activeIndex, isPlaying, canPlay: !reducedMotion && count > 1, goTo, next, previous, togglePlay, holdProps }
}

export default useAutoRotation

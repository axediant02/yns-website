import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

/**
 * Writes `--progress` (0–1) to the element as it travels from the lower
 * part of the viewport to the upper third. Reduced motion pins it at 1.
 */
function useElementScrollProgress() {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    if (prefersReducedMotion()) {
      element.style.setProperty('--progress', '1')
      return undefined
    }

    let frame = 0

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.3
      const progress = (start - rect.top) / (start - end + rect.height * 0.5)

      element.style.setProperty('--progress', Math.min(1, Math.max(0, progress)).toFixed(3))
    }

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return elementRef
}

export default useElementScrollProgress

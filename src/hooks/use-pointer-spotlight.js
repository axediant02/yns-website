import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

/**
 * Writes pointer position as --spot-x / --spot-y (and a -1..1 tilt as
 * --tilt-x / --tilt-y) onto the element. Skipped for coarse pointers
 * and reduced motion.
 */
function usePointerSpotlight() {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    const finePointer = window.matchMedia?.('(pointer: fine)').matches

    if (!element || !finePointer || prefersReducedMotion()) return undefined

    let frame = 0
    let pointer = null

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const x = (pointer.clientX - rect.left) / rect.width
      const y = (pointer.clientY - rect.top) / rect.height

      element.style.setProperty('--spot-x', `${(x * 100).toFixed(2)}%`)
      element.style.setProperty('--spot-y', `${(y * 100).toFixed(2)}%`)
      element.style.setProperty('--tilt-x', (x * 2 - 1).toFixed(3))
      element.style.setProperty('--tilt-y', (y * 2 - 1).toFixed(3))
    }

    const handleMove = (event) => {
      pointer = event
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    element.addEventListener('pointermove', handleMove)

    return () => {
      window.cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', handleMove)
    }
  }, [])

  return elementRef
}

export default usePointerSpotlight

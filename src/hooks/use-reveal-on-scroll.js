import { useEffect, useRef, useState } from 'react'

import { prefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

function useRevealOnScroll({ threshold = 0.16, rootMargin = '0px 0px -48px' } = {}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element || prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { elementRef, isVisible }
}

export default useRevealOnScroll

import { useEffect, useRef, useState } from 'react'

function useRevealOnScroll() {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!element || prefersReducedMotion || !('IntersectionObserver' in window)) {
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
      { threshold: 0.16, rootMargin: '0px 0px -48px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { elementRef, isVisible }
}

export default useRevealOnScroll

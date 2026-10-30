import { useEffect, useRef, useState } from 'react'

/**
 * Reports whether the page has scrolled past `offset`, and writes the
 * scroll progress (0–1) to `--scroll-progress` on the returned ref
 * without re-rendering on every frame.
 */
function useScrollState(offset = 24) {
  const progressRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const { scrollY, innerHeight } = window
      const scrollable = document.documentElement.scrollHeight - innerHeight
      const progress = scrollable > 0 ? Math.min(1, scrollY / scrollable) : 0

      progressRef.current?.style.setProperty('--scroll-progress', progress.toFixed(4))
      setIsScrolled(scrollY > offset)
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
  }, [offset])

  return { isScrolled, progressRef }
}

export default useScrollState

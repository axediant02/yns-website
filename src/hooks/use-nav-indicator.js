import { useLayoutEffect, useRef } from 'react'

/**
 * Slides one highlight pill to the active nav link.
 * Styles are written directly so moving the pill does not re-render the nav.
 */
function useNavIndicator(activeKey) {
  const navRef = useRef(null)
  const indicatorRef = useRef(null)

  useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return undefined

    const update = () => {
      const activeLink = nav.querySelector('[data-active="true"]')

      indicator.style.opacity = activeLink ? '1' : '0'
      if (!activeLink) return

      indicator.style.width = `${activeLink.offsetWidth}px`
      indicator.style.transform = `translateX(${activeLink.offsetLeft}px)`
    }

    update()

    if (typeof ResizeObserver === 'undefined') return undefined

    const observer = new ResizeObserver(update)
    observer.observe(nav)

    return () => observer.disconnect()
  }, [activeKey])

  return { navRef, indicatorRef }
}

export default useNavIndicator

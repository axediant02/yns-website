import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getMediaQuery() {
  return typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY) : null
}

function subscribe(onChange) {
  const mediaQuery = getMediaQuery()
  mediaQuery?.addEventListener('change', onChange)
  return () => mediaQuery?.removeEventListener('change', onChange)
}

export function prefersReducedMotion() {
  return Boolean(getMediaQuery()?.matches)
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false)
}

export default usePrefersReducedMotion

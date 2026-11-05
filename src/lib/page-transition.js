import { prefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

/**
 * Applies a page change inside a View Transition when the browser supports it
 * and motion is allowed; otherwise applies it immediately. The update always runs.
 */
export function runPageTransition(update) {
  if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
    update()
    return
  }

  let transition

  try {
    transition = document.startViewTransition(update)
  } catch (error) {
    console.error('[page-transition] Could not start the view transition; switching pages without animation.', { name: error?.name, message: error?.message })
    update()
    return
  }

  transition.ready.catch((error) => {
    // A newer navigation interrupting this one is expected, not a failure.
    if (error?.name === 'AbortError') return
    console.error('[page-transition] View transition was skipped; the page changed without animation.', { name: error?.name, message: error?.message })
  })
}

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useSiteRoute from './use-site-route'

function changeHash(hash) {
  window.history.replaceState({}, '', `/${hash}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

describe('useSiteRoute', () => {
  let startViewTransition

  beforeEach(() => {
    window.history.replaceState({}, '', '/')
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    startViewTransition = vi.fn((update) => {
      update()
      return { ready: Promise.resolve() }
    })
    document.startViewTransition = startViewTransition
  })

  afterEach(() => {
    delete document.startViewTransition
    delete window.matchMedia
  })

  it('animates page changes but not in-page anchor jumps', () => {
    const { result } = renderHook(() => useSiteRoute())

    act(() => changeHash('#about'))
    expect(result.current).toEqual({ type: 'home', anchor: 'about' })
    expect(startViewTransition).not.toHaveBeenCalled()

    act(() => changeHash('#gallery-all'))
    expect(result.current).toEqual({ type: 'gallery-index' })
    expect(startViewTransition).toHaveBeenCalledOnce()

    act(() => {
      window.history.pushState({}, '', '/events')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(result.current).toEqual({ type: 'events' })
    expect(startViewTransition).toHaveBeenCalledTimes(2)
  })
})

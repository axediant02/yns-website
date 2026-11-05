import { afterEach, describe, expect, it, vi } from 'vitest'

import { runPageTransition } from './page-transition'

function mockReducedMotion(matches) {
  window.matchMedia = vi.fn().mockReturnValue({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() })
}

function mockViewTransitions(ready = Promise.resolve()) {
  const startViewTransition = vi.fn((update) => {
    update()
    return { ready }
  })
  document.startViewTransition = startViewTransition
  return startViewTransition
}

describe('runPageTransition', () => {
  afterEach(() => {
    delete document.startViewTransition
    delete window.matchMedia
    vi.restoreAllMocks()
  })

  it('applies the update directly when view transitions are unsupported', () => {
    const update = vi.fn()

    runPageTransition(update)

    expect(update).toHaveBeenCalledOnce()
  })

  it('animates through a view transition when supported and motion is allowed', () => {
    mockReducedMotion(false)
    const startViewTransition = mockViewTransitions()
    const update = vi.fn()

    runPageTransition(update)

    expect(startViewTransition).toHaveBeenCalledWith(update)
    expect(update).toHaveBeenCalledOnce()
  })

  it('skips the animation when reduced motion is requested', () => {
    mockReducedMotion(true)
    const startViewTransition = mockViewTransitions()
    const update = vi.fn()

    runPageTransition(update)

    expect(startViewTransition).not.toHaveBeenCalled()
    expect(update).toHaveBeenCalledOnce()
  })

  it('still updates and reports when the transition cannot start', () => {
    mockReducedMotion(false)
    document.startViewTransition = vi.fn(() => {
      throw new DOMException('Document hidden', 'InvalidStateError')
    })
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const update = vi.fn()

    runPageTransition(update)

    expect(update).toHaveBeenCalledOnce()
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('[page-transition]'), { name: 'InvalidStateError', message: 'Document hidden' })
  })

  it('reports skipped transitions but ignores interruption by newer navigation', async () => {
    mockReducedMotion(false)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    mockViewTransitions(Promise.reject(new DOMException('Skipped', 'AbortError')))
    runPageTransition(vi.fn())
    await Promise.resolve()
    expect(consoleError).not.toHaveBeenCalled()

    mockViewTransitions(Promise.reject(new DOMException('Duplicate name', 'InvalidStateError')))
    runPageTransition(vi.fn())
    await vi.waitFor(() => expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('skipped'), { name: 'InvalidStateError', message: 'Duplicate name' }))
  })
})

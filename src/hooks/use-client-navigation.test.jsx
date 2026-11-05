import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useClientNavigation from './use-client-navigation'

function Links() {
  useClientNavigation()

  return (
    <>
      <a href="/">Home</a>
      <a href="/about">About page</a>
      <a href="#contact">Same-page anchor</a>
      <a href="https://example.com/about">External</a>
      <a href="/stories" target="_blank">New tab</a>
    </>
  )
}

describe('useClientNavigation', () => {
  let onPopState

  beforeEach(() => {
    window.history.replaceState({}, '', '/')
    onPopState = vi.fn()
    window.addEventListener('popstate', onPopState)
  })

  afterEach(() => {
    window.removeEventListener('popstate', onPopState)
    cleanup()
  })

  it('navigates plain clicks to other site pages without a reload', () => {
    render(<Links />)

    const click = fireEvent.click(screen.getByRole('link', { name: 'About page' }))

    expect(click).toBe(false)
    expect(window.location.pathname).toBe('/about')
    expect(onPopState).toHaveBeenCalledOnce()
  })

  it('returns to the top instead of reloading when linking to the current page', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    window.history.replaceState({}, '', '/#about')
    render(<Links />)

    expect(fireEvent.click(screen.getByRole('link', { name: 'Home' }))).toBe(false)
    expect(window.location.pathname + window.location.hash).toBe('/')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
    scrollTo.mockRestore()
  })

  it('leaves same-page anchors, external links, new tabs, and modified clicks to the browser', () => {
    render(<Links />)

    expect(fireEvent.click(screen.getByRole('link', { name: 'Same-page anchor' }))).toBe(true)
    expect(fireEvent.click(screen.getByRole('link', { name: 'External' }))).toBe(true)
    expect(fireEvent.click(screen.getByRole('link', { name: 'New tab' }))).toBe(true)
    expect(fireEvent.click(screen.getByRole('link', { name: 'About page' }), { ctrlKey: true })).toBe(true)
    expect(onPopState).not.toHaveBeenCalled()
  })
})

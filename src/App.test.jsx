import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'
import { INTRO_DURATION } from './hooks/use-intro'

describe('App', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    window.history.replaceState({}, '', '/')
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('plays the intro once per session and can be skipped', () => {
    vi.useFakeTimers()
    const { unmount } = render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Skip intro' }))
    act(() => vi.advanceTimersByTime(INTRO_DURATION))

    expect(screen.queryByRole('button', { name: 'Skip intro' })).toBeNull()
    expect(document.documentElement.style.overflow).toBe('')

    unmount()
    render(<App />)
    expect(screen.queryByRole('button', { name: 'Skip intro' })).toBeNull()
  })

  it('renders one primary heading with the welcome message', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Find your people. Follow Jesus.')
  })

  it('switches the shared map when another location is selected', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /Mainggit/ }))

    expect(screen.getByRole('button', { name: /Mainggit/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByTitle('Map showing Mainggit, Toledo City, Cebu')).toBeInTheDocument()
  })

  it('keeps the contact action disabled until a verified link exists', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Contact link coming soon' })).toBeDisabled()
  })

  it('renders a not-found state for unknown locations', () => {
    window.history.replaceState({}, '', '/locations/unknown-place')
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('We could not find that place.')
    expect(document.title).toBe('YNS D6 — Location not found')
  })
})

import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
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

  it('keeps every section on the homepage while nav links open separate pages', () => {
    render(<App />)

    for (const id of ['about', 'gathering', 'gallery', 'stories', 'leadership', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }

    const nav = within(screen.getByRole('navigation', { name: 'Primary navigation' }))
    expect(nav.getAllByRole('link')[0]).toHaveAccessibleName('Home')
    expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(nav.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', '/#gallery-all')
    expect(nav.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '/events')
  })

  it('keeps Home highlighted while scrolling homepage sections', () => {
    const observers = []
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) {
        this.callback = callback
        this.targets = []
        observers.push(this)
      }
      observe(target) { this.targets.push(target) }
      unobserve() {}
      disconnect() {}
    })
    render(<App />)

    const about = document.getElementById('about')
    act(() => observers.forEach((observer) => observer.callback([{ target: about, isIntersecting: true }], observer)))

    const nav = within(screen.getByRole('navigation', { name: 'Primary navigation' }))
    expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(nav.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
    expect(nav.getByRole('link', { name: 'About' })).toHaveClass('text-cream/70')
    expect(nav.getByRole('link', { name: 'Home' })).not.toHaveClass('text-cream/70')
    vi.unstubAllGlobals()
  })

  it('switches to a section page client-side and marks its nav link current', () => {
    render(<App />)

    const nav = within(screen.getByRole('navigation', { name: 'Primary navigation' }))
    fireEvent.click(nav.getByRole('link', { name: 'Stories' }))

    expect(window.location.pathname).toBe('/stories')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Every story starts somewhere.')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.title).toBe('YNS D6 — Stories')
    expect(nav.getByRole('link', { name: 'Stories' })).toHaveAttribute('aria-current', 'page')

    fireEvent.click(nav.getByRole('link', { name: 'Home' }))

    expect(window.location.pathname).toBe('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Find your people. Follow Jesus.')
    expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders a not-found state for unknown locations', () => {
    window.history.replaceState({}, '', '/locations/unknown-place')
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('We could not find that place.')
    expect(document.title).toBe('YNS D6 — Location not found')
  })
})

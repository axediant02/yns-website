import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'
import HomepageContentState from './homepage-content-state'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  window.scrollTo = vi.fn()
  window.requestAnimationFrame = vi.fn((callback) => { callback(0); return 1 })
  const description = document.createElement('meta')
  description.name = 'description'
  description.content = 'Old static Sunday schedule'
  document.head.append(description)
  vi.clearAllMocks()
})
afterEach(() => {
  cleanup()
  document.head.querySelector('meta[name="description"]')?.remove()
})

describe('public homepage cutover without a public contents contract', () => {
  it('keeps the page structure but removes editorial fixtures, media, and unverified header/footer facts', () => {
    render(<App />)
    expect(screen.getByRole('alert')).toHaveTextContent('Content is temporarily unavailable.')
    for (const id of ['top', 'about', 'gathering', 'gallery', 'stories', 'leadership', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.queryByText(/Find your people|There is room|Everyone is invited|Lorem ipsum|Youth Camp 2026|Leadership team/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Toledo City|10:00 AM|See you Sunday/)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Join us/ })).not.toBeInTheDocument()
    expect(document.querySelector('img, iframe')).toBeNull()
    expect(document.title).toBe('Youth Nation Shakers District 6 | YNS D6')
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Youth Nation Shakers District 6 (YNS D6).')
    expect(axios.get).not.toHaveBeenCalled()
  })

  it('retains homepage navigation and the existing mobile menu without static content CTAs', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }))
    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('href', '/#about')
    expect(screen.queryByRole('button', { name: 'Locations' })).not.toBeInTheDocument()
  })

  it('leaves non-homepage event views unchanged', () => {
    window.history.replaceState(null, '', '/events')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('More events')
    expect(screen.getByText('Event names, dates, locations, and photos will be added once they are confirmed by the community.')).toBeInTheDocument()
    expect(screen.getByText('See you Sunday')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('homepage request-state presentation', () => {
  it('distinguishes pending content from unavailable or empty data', () => {
    render(<HomepageContentState status="loading" />)
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getAllByText('Loading content…').length).toBeGreaterThan(0)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    cleanup()
    render(<HomepageContentState status="empty" />)
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false')
    expect(screen.getAllByText('No published content is available yet.').length).toBeGreaterThan(0)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('offers retry only when a real retry handler is supplied', () => {
    render(<HomepageContentState />)
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
    cleanup()
    const retry = vi.fn()
    render(<HomepageContentState onRetry={retry} />)
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(retry).toHaveBeenCalledOnce()
  })
})

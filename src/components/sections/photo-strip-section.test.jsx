import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import PhotoStripSection from './photo-strip-section'

let media
let motionListeners

beforeEach(() => {
  motionListeners = new Set()
  media = {
    matches: false,
    addEventListener: (_event, listener) => motionListeners.add(listener),
    removeEventListener: (_event, listener) => motionListeners.delete(listener),
  }
  vi.stubGlobal('matchMedia', vi.fn(() => media))
})

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('homepage photo strip', () => {
  it('shows six labeled placeholders with one accessible photo list and decorative loop copies', () => {
    const { container } = render(<PhotoStripSection />)
    const section = screen.getByRole('region', { name: 'A glimpse of life together.' })
    expect(within(section).getByText(/not photos of YNS members or events/)).toBeInTheDocument()
    expect(within(section).getAllByRole('list')).toHaveLength(1)
    expect(within(section).getAllByRole('img')).toHaveLength(6)
    expect(container.querySelector('ul[aria-hidden="true"]')).toBeInTheDocument()
    expect(container.querySelectorAll('img')).toHaveLength(12)
    within(section).getAllByRole('img').forEach((photo) => {
      expect(photo).toHaveAttribute('alt', expect.stringContaining('Illustrative placeholder:'))
      expect(photo).toHaveAttribute('loading', 'lazy')
    })
  })

  it('plays automatically without playback buttons or hover pause', () => {
    const { container } = render(<PhotoStripSection />)
    const image = screen.getAllByRole('img')[0]
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const marquee = container.querySelector('.marquee')
    expect(marquee).toHaveAttribute('data-pause-on-hover', 'false')
    fireEvent.mouseEnter(marquee)
    expect(container.querySelector('.marquee-track').style.animationPlayState).toBe('')
    expect(screen.getAllByRole('img')[0]).toBe(image)
  })

  it('stops the loop when reduced motion changes', () => {
    const { container, unmount } = render(<PhotoStripSection />)
    act(() => { media.matches = true; motionListeners.forEach((listener) => listener()) })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(container.querySelector('.marquee-track')).toHaveStyle({ animationPlayState: 'paused' })
    expect(screen.getAllByRole('img')).toHaveLength(6)
    unmount()
    expect(motionListeners.size).toBe(0)
  })

  it('keeps a failed photo slot readable and reports only the original copy', () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { container } = render(<PhotoStripSection />)
    fireEvent.error(container.querySelector('ul[aria-hidden="true"] img'))
    fireEvent.error(screen.getAllByRole('img')[0])
    expect(screen.getAllByText('Photo unavailable')).toHaveLength(2)
    expect(report).toHaveBeenCalledTimes(1)
    expect(report).toHaveBeenCalledWith('Homepage slider photo could not be loaded', expect.objectContaining({
      feature: 'homepage-photo-strip', operation: 'load-image', code: 'IMAGE_LOAD_FAILED',
    }))
    expect(JSON.stringify(report.mock.calls)).not.toContain('images.unsplash.com')
  })

  it('handles empty and single-photo collections without automatic playback', () => {
    const { rerender, container } = render(<PhotoStripSection photos={[]} />)
    expect(screen.getByRole('status')).toHaveTextContent('Photos will be added here soon')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    rerender(<PhotoStripSection photos={[{ id: 'test', src: '/test.jpg', alt: 'Test placeholder' }]} />)
    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(container.querySelector('ul[aria-hidden="true"]')).not.toBeInTheDocument()
    expect(container.querySelector('.marquee-track')).toHaveStyle({ animationPlayState: 'paused' })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useAutoRotation from './use-auto-rotation'

let observers

function Rotator({ count = 3 }) {
  const { containerRef, holdProps, index, isPlaying, togglePlay, previous } = useAutoRotation(count, { interval: 1000 })

  return (
    <div ref={containerRef} {...holdProps} data-testid="rotator">
      <output>{index}</output>
      <button type="button" onClick={togglePlay}>{isPlaying ? 'pause' : 'play'}</button>
      <button type="button" onClick={previous}>previous</button>
    </div>
  )
}

function setInView(isIntersecting) {
  act(() => observers.forEach((observer) => observer.callback([{ isIntersecting }])))
}

describe('useAutoRotation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    observers = []
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) {
        this.callback = callback
        observers.push(this)
      }
      observe() {}
      disconnect() {}
    })
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    delete window.matchMedia
  })

  it('advances only while on screen and wraps around', () => {
    render(<Rotator />)

    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByRole('status')).toHaveTextContent('0')

    setInView(true)
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByRole('status')).toHaveTextContent('1')
    act(() => vi.advanceTimersByTime(1000))
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByRole('status')).toHaveTextContent('0')
  })

  it('holds while hovered and stops when paused', () => {
    render(<Rotator />)
    setInView(true)

    fireEvent.mouseEnter(screen.getByTestId('rotator'))
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByRole('status')).toHaveTextContent('0')

    fireEvent.mouseLeave(screen.getByTestId('rotator'))
    fireEvent.click(screen.getByRole('button', { name: 'pause' }))
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByRole('status')).toHaveTextContent('0')
  })

  it('never auto-advances for reduced motion but still navigates manually', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    render(<Rotator />)
    setInView(true)

    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByRole('status')).toHaveTextContent('0')
    expect(screen.getByRole('button', { name: 'play' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'previous' }))
    expect(screen.getByRole('status')).toHaveTextContent('2')
  })
})

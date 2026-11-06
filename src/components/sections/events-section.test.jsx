import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import EventsSection from './events-section'

describe('EventsSection', () => {
  afterEach(cleanup)

  it('shows three clearly labelled placeholder events without invented dates or venues', () => {
    render(<EventsSection />)

    const section = screen.getByRole('region', { name: /Save the/ })
    const cards = within(section).getAllByRole('article')
    expect(cards).toHaveLength(3)
    cards.forEach((card) => {
      expect(within(card).getByText('Placeholder')).toBeInTheDocument()
      expect(within(card).getByText('Date to be confirmed')).toBeInTheDocument()
      expect(within(card).getByText('Location to be confirmed')).toBeInTheDocument()
      expect(within(card).getByText('TBA')).toBeInTheDocument()
    })
    expect(within(section).getByText(/These cards are placeholders/)).toBeInTheDocument()
    expect(within(section).getByRole('link', { name: 'See all events' })).toHaveAttribute('href', '/events')
  })

  it('renders confirmed details and a provided poster, limited to three events', () => {
    const event = (id) => ({
      id, status: 'published', kind: 'Gathering', title: `Event ${id}`, description: 'Details',
      startsAt: '2026-12-05T18:30', endsAt: null, location: 'Toledo City', poster: { src: '/poster.jpg', alt: `Poster for event ${id}` },
    })
    render(<EventsSection events={['a', 'b', 'c', 'd'].map(event)} />)

    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(3)
    expect(within(cards[0]).getByRole('heading', { name: 'Event a' })).toBeInTheDocument()
    expect(within(cards[0]).getByRole('img', { name: 'Poster for event a' })).toHaveAttribute('src', '/poster.jpg')
    expect(within(cards[0]).getByText('Dec 5, 2026, 6:30 PM')).toBeInTheDocument()
    expect(within(cards[0]).getByText('Dec')).toBeInTheDocument()
    expect(within(cards[0]).queryByText('Placeholder')).not.toBeInTheDocument()
  })
})

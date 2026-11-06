import { describe, expect, it } from 'vitest'

import { eventDateBadge, formatEventTime } from './event-schedule'

describe('event schedule formatting', () => {
  it('formats contract times in Philippine time', () => {
    expect(formatEventTime('2026-12-05T18:30')).toBe('Dec 5, 2026, 6:30 PM')
    expect(eventDateBadge('2026-12-05T23:30')).toEqual({ month: 'Dec', day: '5' })
  })

  it('treats missing or invalid times as unconfirmed', () => {
    expect(formatEventTime(null)).toBe('Date to be confirmed')
    expect(formatEventTime('not-a-date')).toBe('Date to be confirmed')
    expect(eventDateBadge('')).toBeNull()
  })
})

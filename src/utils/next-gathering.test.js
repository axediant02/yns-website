import { describe, expect, it } from 'vitest'

import { formatGatheringStart, getCountdownParts, getNextGathering } from './next-gathering'

describe('formatGatheringStart', () => {
  it('formats the start in Philippine time regardless of the visitor time zone', () => {
    expect(formatGatheringStart(new Date('2026-11-01T02:00:00Z'))).toBe('Sunday, November 1 at 10:00 AM')
  })
})

describe('getNextGathering', () => {
  it('finds the coming Sunday 10:00 AM in Philippine time', () => {
    // Wednesday 2026-10-28 09:00 in Manila
    const result = getNextGathering(new Date('2026-10-28T01:00:00Z'))

    expect(result.isLive).toBe(false)
    expect(result.start.toISOString()).toBe('2026-11-01T02:00:00.000Z')
    expect(result.end.toISOString()).toBe('2026-11-01T04:00:00.000Z')
  })

  it('reports a live gathering during the Sunday window', () => {
    // Sunday 2026-11-01 11:15 in Manila
    const result = getNextGathering(new Date('2026-11-01T03:15:00Z'))

    expect(result.isLive).toBe(true)
    expect(result.start.toISOString()).toBe('2026-11-01T02:00:00.000Z')
  })

  it('moves to the following week once the gathering ends', () => {
    // Sunday 2026-11-01 12:00 in Manila, exactly at the end
    const result = getNextGathering(new Date('2026-11-01T04:00:00Z'))

    expect(result.isLive).toBe(false)
    expect(result.start.toISOString()).toBe('2026-11-08T02:00:00.000Z')
  })

  it('uses Manila time even when the UTC date is still Saturday', () => {
    // Saturday 2026-10-31 20:00 UTC is Sunday 04:00 in Manila
    const result = getNextGathering(new Date('2026-10-31T20:00:00Z'))

    expect(result.start.toISOString()).toBe('2026-11-01T02:00:00.000Z')
  })
})

describe('getCountdownParts', () => {
  it('splits milliseconds into days, hours, minutes, and seconds', () => {
    expect(getCountdownParts(((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 })
  })

  it('never returns negative values', () => {
    expect(getCountdownParts(-5000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  })
})

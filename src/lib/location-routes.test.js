import { describe, expect, it } from 'vitest'

import { getLocationRoute, isEventsPath } from './location-routes'

describe('public routes', () => {
  it('recognizes the events route with an optional trailing slash', () => {
    expect(isEventsPath('/events')).toBe(true)
    expect(isEventsPath('/events/')).toBe(true)
    expect(isEventsPath('/events/archive')).toBe(false)
  })

  it('extracts a decoded location slug without accepting nested paths', () => {
    expect(getLocationRoute('/locations/bato-toledo-city')).toEqual({ slug: 'bato-toledo-city' })
    expect(getLocationRoute('/locations/camp%203/')).toEqual({ slug: 'camp 3' })
    expect(getLocationRoute('/locations/bato/photos')).toBeNull()
  })
})

import { describe, expect, it } from 'vitest'

import { getPageMeta } from './page-meta'
import { resolveSiteRoute } from './site-route'

describe('resolveSiteRoute', () => {
  it('prefers path routes over gallery hashes', () => {
    expect(resolveSiteRoute('/events', '#gallery-all')).toEqual({ type: 'events' })
    expect(resolveSiteRoute('/locations/bato-toledo-city', '')).toEqual({ type: 'location', slug: 'bato-toledo-city' })
  })

  it('resolves gallery index and event hashes on the home path', () => {
    expect(resolveSiteRoute('/', '#gallery-all')).toEqual({ type: 'gallery-index' })
    expect(resolveSiteRoute('/', '#gallery-event-youth-camp-2026')).toEqual({ type: 'gallery-event', eventId: 'youth-camp-2026' })
  })

  it('treats other hashes as home anchors', () => {
    expect(resolveSiteRoute('/', '#about')).toEqual({ type: 'home', anchor: 'about' })
    expect(resolveSiteRoute('/', '')).toEqual({ type: 'home', anchor: '' })
  })
})

describe('getPageMeta', () => {
  it('describes known and missing locations', () => {
    expect(getPageMeta({ type: 'location', slug: 'bato-toledo-city' }).title).toBe('YNS D6 — Bato, Toledo City, Cebu')
    expect(getPageMeta({ type: 'location', slug: 'nowhere' }).title).toBe('YNS D6 — Location not found')
  })

  it('falls back to the gallery title for unknown albums', () => {
    expect(getPageMeta({ type: 'gallery-event', eventId: 'missing' }).title).toBe('YNS D6 Gallery — See the life around here.')
  })
})

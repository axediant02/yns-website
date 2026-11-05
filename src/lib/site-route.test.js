import { describe, expect, it } from 'vitest'

import { getPageMeta } from './page-meta'
import { getRouteKey, getSectionPageHref, resolveSiteRoute } from './site-route'

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

describe('section pages', () => {
  it('resolves each section page path, ahead of gallery hashes', () => {
    expect(resolveSiteRoute('/about', '')).toEqual({ type: 'about' })
    expect(resolveSiteRoute('/gathering/', '')).toEqual({ type: 'gathering' })
    expect(resolveSiteRoute('/contact', '#gallery-all')).toEqual({ type: 'contact' })
  })

  it('links sections to their page, the gallery index, or the home anchor', () => {
    expect(getSectionPageHref('stories')).toBe('/stories')
    expect(getSectionPageHref('gallery')).toBe('/#gallery-all')
    expect(getSectionPageHref('top')).toBe('/#top')
  })

  it('gives each section page its own metadata', () => {
    expect(getPageMeta({ type: 'about' }).title).toBe('YNS D6 — About')
    expect(getPageMeta({ type: 'leadership' }).title).toBe('YNS D6 — Leadership')
  })
})

describe('getRouteKey', () => {
  it('treats home anchors as one page and distinguishes page targets', () => {
    expect(getRouteKey(resolveSiteRoute('/', '#about'))).toBe(getRouteKey(resolveSiteRoute('/', '#contact')))
    expect(getRouteKey(resolveSiteRoute('/', '#gallery-all'))).not.toBe(getRouteKey(resolveSiteRoute('/', '')))
    expect(getRouteKey({ type: 'location', slug: 'a' })).not.toBe(getRouteKey({ type: 'location', slug: 'b' }))
    expect(getRouteKey({ type: 'gallery-event', eventId: 'a' })).not.toBe(getRouteKey({ type: 'gallery-event', eventId: 'b' }))
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

import { getLocationRoute, isEventsPath } from '@/lib/location-routes'

const GALLERY_INDEX_HASH = '#gallery-all'
const GALLERY_EVENT_PREFIX = '#gallery-event-'

/** Homepage sections that also have their own page at `/<type>`. */
export const SECTION_PAGE_TYPES = ['about', 'gathering', 'stories', 'leadership', 'contact']

export function getGalleryHref(eventId) {
  return eventId ? `${GALLERY_EVENT_PREFIX}${eventId}` : GALLERY_INDEX_HASH
}

/** Page link for a homepage section: its own page, the gallery index, or the home anchor. */
export function getSectionPageHref(sectionId) {
  if (sectionId === 'gallery') return `/${GALLERY_INDEX_HASH}`
  return SECTION_PAGE_TYPES.includes(sectionId) ? `/${sectionId}` : `/#${sectionId}`
}

function getSectionPageType(pathname) {
  const type = pathname.match(/^\/([a-z]+)\/?$/)?.[1]
  return SECTION_PAGE_TYPES.includes(type) ? type : null
}

/** Resolves the public client route from the current pathname and hash. */
export function resolveSiteRoute(pathname, hash = '') {
  if (isEventsPath(pathname)) return { type: 'events' }

  const locationRoute = getLocationRoute(pathname)
  if (locationRoute) return { type: 'location', slug: locationRoute.slug }

  const sectionPageType = getSectionPageType(pathname)
  if (sectionPageType) return { type: sectionPageType }

  if (hash === GALLERY_INDEX_HASH) return { type: 'gallery-index' }
  if (hash.startsWith(GALLERY_EVENT_PREFIX)) return { type: 'gallery-event', eventId: hash.slice(GALLERY_EVENT_PREFIX.length) }

  return { type: 'home', anchor: hash.slice(1) }
}

/** Identifies the rendered page; home anchors share one key so in-page jumps are not page changes. */
export function getRouteKey({ type, slug, eventId }) {
  return [type, slug ?? eventId ?? ''].join(':')
}

export function isPlainLeftClick(event) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

/** Client-side navigation for path routes; keeps the static deployment model. */
export function navigateTo(href) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

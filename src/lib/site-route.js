import { getLocationRoute, isEventsPath } from '@/lib/location-routes'

const GALLERY_INDEX_HASH = '#gallery-all'
const GALLERY_EVENT_PREFIX = '#gallery-event-'

export function getGalleryHref(eventId) {
  return eventId ? `${GALLERY_EVENT_PREFIX}${eventId}` : GALLERY_INDEX_HASH
}

/** Resolves the public client route from the current pathname and hash. */
export function resolveSiteRoute(pathname, hash = '') {
  if (isEventsPath(pathname)) return { type: 'events' }

  const locationRoute = getLocationRoute(pathname)
  if (locationRoute) return { type: 'location', slug: locationRoute.slug }

  if (hash === GALLERY_INDEX_HASH) return { type: 'gallery-index' }
  if (hash.startsWith(GALLERY_EVENT_PREFIX)) return { type: 'gallery-event', eventId: hash.slice(GALLERY_EVENT_PREFIX.length) }

  return { type: 'home', anchor: hash.slice(1) }
}

/** Client-side navigation for path routes; keeps the static deployment model. */
export function navigateTo(href) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

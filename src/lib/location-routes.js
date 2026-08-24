import { locations } from '@/data/community'

export function getLocationRoute(pathname) {
  const match = pathname.match(/^\/locations\/([^/]+)\/?$/)

  return match ? { slug: decodeURIComponent(match[1]) } : null
}

export function isEventsPath(pathname) {
  return /^\/events\/?$/.test(pathname)
}

export function getLocationBySlug(slug) {
  return locations.find((location) => location.id === slug)
}

export function getLocationHref(location) {
  return `/locations/${location.id}`
}

export function getSiteHref(href) {
  return href.startsWith('#') ? `/${href}` : href
}

export function getGoogleMapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function getGoogleMapsEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

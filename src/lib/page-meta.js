import { galleryEvents } from '@/data/community'
import { getLocationBySlug } from '@/lib/location-routes'

const HOME_META = {
  title: 'YNS D6 — Find your people. Follow Jesus.',
  description: 'Youth Nation Shakers District 6 is a welcoming community in Toledo City, Cebu. Join us every Sunday from 10:00 AM to 12:00 noon.',
}

const GALLERY_META = {
  title: 'YNS D6 Gallery — See the life around here.',
  description: 'Explore illustrative event albums from the welcoming community of YNS D6.',
}

function getLocationMeta(slug) {
  const location = getLocationBySlug(slug)

  if (!location) {
    return { title: 'YNS D6 — Location not found', description: 'The requested YNS D6 location could not be found.' }
  }

  return {
    title: `YNS D6 — ${location.name}, ${location.area}`,
    description: `Find gathering details and directions for YNS D6 in ${location.name}, ${location.area}.`,
  }
}

function getGalleryEventMeta(eventId) {
  const event = galleryEvents.find((galleryEvent) => galleryEvent.id === eventId)

  return event ? { title: `YNS D6 Gallery — ${event.title}`, description: event.description } : GALLERY_META
}

/** Title and description for each client-rendered page. */
export function getPageMeta(route) {
  switch (route.type) {
    case 'events':
      return { title: 'YNS D6 — Events', description: 'Discover upcoming YNS D6 gatherings, community events, and shared moments across Cebu.' }
    case 'location':
      return getLocationMeta(route.slug)
    case 'gallery-index':
      return GALLERY_META
    case 'gallery-event':
      return getGalleryEventMeta(route.eventId)
    default:
      return HOME_META
  }
}

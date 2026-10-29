import { useEffect, useState } from 'react'

import './App.css'

import GalleryPage from '@/components/pages/gallery-page'
import EventsPage from '@/components/pages/events-page'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import PublicHomepage from '@/features/homepage/public-homepage'
import { galleryEvents, locations } from '@/data/community'
import LocationPage from '@/components/pages/location-page'
import { getLocationRoute, isEventsPath } from '@/lib/location-routes'

function getGalleryRoute(hash) {
  if (hash === '#gallery-all') return { type: 'index' }
  if (hash.startsWith('#gallery-event-')) return { type: 'event', eventId: hash.replace('#gallery-event-', '') }
  return null
}

function App() {
  const [galleryRoute, setGalleryRoute] = useState(() => getGalleryRoute(window.location.hash))
  const [locationRoute, setLocationRoute] = useState(() => getLocationRoute(window.location.pathname))
  const [isEventsPage, setIsEventsPage] = useState(() => isEventsPath(window.location.pathname))

  useEffect(() => {
    const handleHashChange = () => setGalleryRoute(getGalleryRoute(window.location.hash))
    const handlePopState = () => {
      setLocationRoute(getLocationRoute(window.location.pathname))
      setIsEventsPage(isEventsPath(window.location.pathname))
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]')

    if (isEventsPage) {
      document.title = 'YNS D6 — Events'
      description?.setAttribute('content', 'Discover upcoming YNS D6 gatherings, community events, and shared moments across Cebu.')
      window.scrollTo(0, 0)
    } else if (locationRoute) {
      const location = locations.find((communityLocation) => communityLocation.id === locationRoute.slug)
      document.title = location ? `YNS D6 — ${location.name}, ${location.area}` : 'YNS D6 — Location not found'
      description?.setAttribute('content', location ? `Find gathering details and directions for YNS D6 in ${location.name}, ${location.area}.` : 'The requested YNS D6 location could not be found.')
      window.scrollTo(0, 0)
    } else if (galleryRoute) {
      const event = galleryEvents.find((galleryEvent) => galleryEvent.id === galleryRoute.eventId)
      document.title = event ? `YNS D6 Gallery — ${event.title}` : 'YNS D6 Gallery — See the life around here.'
      description?.setAttribute('content', event ? event.description : 'Explore illustrative event albums from the welcoming community of YNS D6.')
      window.scrollTo(0, 0)
    } else {
      document.title = 'Youth Nation Shakers District 6 | YNS D6'
      description?.setAttribute('content', 'Youth Nation Shakers District 6 (YNS D6).')

      const targetId = window.location.hash.slice(1)
      if (targetId) {
        window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: 'start' }))
      }
    }
  }, [galleryRoute, isEventsPage, locationRoute])

  if (!isEventsPage && !locationRoute && !galleryRoute) return <PublicHomepage />

  return (
    <div className="site-shell">
      <SiteHeader />
      {isEventsPage ? (
        <EventsPage />
      ) : locationRoute ? (
        <LocationPage slug={locationRoute.slug} />
      ) : galleryRoute ? (
        <GalleryPage route={galleryRoute} />
      ) : (
        null
      )}
      <SiteFooter />
    </div>
  )
}

export default App

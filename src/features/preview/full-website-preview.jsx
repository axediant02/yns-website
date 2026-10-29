import { useMemo } from 'react'
import HomePage from '@/components/pages/home-page'
import LocationPage from '@/components/pages/location-page'
import GalleryPage from '@/components/pages/gallery-page'
import EventsPage from '@/components/pages/events-page'
import SiteHeader from '@/components/layout/site-header'
import SiteFooter from '@/components/layout/site-footer'
import { buildPreviewSite } from './site-preview-model'
import { useSitePreviewNavigation } from './use-site-preview-navigation'

export default function FullWebsitePreview({ snapshot }) {
  const site = useMemo(() => buildPreviewSite(snapshot.patches), [snapshot.patches])
  const { route, navigate } = useSitePreviewNavigation(snapshot.active)
  const location = route.type === 'location' ? site.locations.find((item) => item.id === route.id) : null
  let page = <HomePage sections={site.sections} />
  if (route.type === 'events') page = <EventsPage events={site.events} items={site.locations} />
  if (route.type === 'location') page = <LocationPage content={location} slug={route.id} gathering={site.gathering} albums={site.albums} />
  if (route.type === 'album' || route.type === 'gallery') page = <GalleryPage key={route.id ?? 'index'} route={route.type === 'gallery' ? { type: 'index' } : { type: 'event', eventId: route.id }} events={site.albums} />
  return <div onClickCapture={navigate}>
    <SiteHeader key={`${route.type}:${route.id ?? ''}`} items={site.locations} location={location} identity={site.identity} />
    {page}
    <SiteFooter identity={site.identity} location={location} />
  </div>
}

import GalleryEventView from '@/components/pages/gallery-event-view'
import GalleryIndex from '@/components/pages/gallery-index'
import NotFoundHero from '@/components/common/not-found-hero'
import { galleryEvents } from '@/data/community'
import { getGalleryHref } from '@/lib/site-route'

function GalleryPage({ route }) {
  if (route.type === 'gallery-index') return <GalleryIndex />

  const event = galleryEvents.find((galleryEvent) => galleryEvent.id === route.eventId)

  if (!event) {
    return (
      <NotFoundHero
        eyebrow="Gallery"
        title="That album"
        accent="is not here."
        description="Return to the event albums to choose another collection of moments."
        actionHref={getGalleryHref()}
        actionLabel="Back to all events"
      />
    )
  }

  return <GalleryEventView event={event} />
}

export default GalleryPage

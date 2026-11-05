import Container from '@/components/common/container'
import Eyebrow from '@/components/common/eyebrow'
import PhotoLightbox from '@/components/common/photo-lightbox'
import PhotoTile from '@/components/common/photo-tile'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import { galleryEvents, locationPhotoPreviews } from '@/data/community'
import usePhotoViewer from '@/hooks/use-photo-viewer'

function formatEventDate(date) {
  if (!date) return 'Date to be confirmed'

  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`))
}

function getTimelineEvents(locationId) {
  const verifiedEvents = galleryEvents.filter((event) => event.locationIds?.includes(locationId))
  const preview = locationPhotoPreviews.find((event) => event.locationIds.includes(locationId))

  return [...verifiedEvents, ...(preview ? [preview] : [])]
}

function TimelineEvent({ event, onOpenPhoto }) {
  return (
    <Reveal as="article" className="relative border-l border-ink/15 pb-16 pl-8 last:pb-0 sm:pl-12">
      <span className="absolute top-1 -left-[7px] size-3.5 rounded-full bg-linear-to-br from-ember to-dawn ring-4 ring-cream" aria-hidden="true" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Eyebrow>{event.isIllustrative ? 'Illustrative preview' : event.label}</Eyebrow>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{event.title}</h3>
        </div>
        <time dateTime={event.date || undefined} className="font-mono text-sm text-muted-foreground">
          {formatEventDate(event.date)}
        </time>
      </div>
      <p className="mt-3 max-w-2xl text-muted-foreground">{event.description}</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-3" aria-label={`${event.title} photos`}>
        {event.photos.map((photo, index) => (
          <li key={photo.id} className="aspect-[4/5]">
            <PhotoTile photo={photo} label={`Open ${event.title} photo: ${photo.title}`} onOpen={() => onOpenPhoto(event, index)}>
              <span className="block text-xs text-cream/70">{event.isIllustrative ? 'Date to be confirmed' : formatEventDate(event.date)}</span>
            </PhotoTile>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function LocationPhotoTimeline({ location }) {
  const viewer = usePhotoViewer()
  const timelineEvents = getTimelineEvents(location.id)

  return (
    <section aria-labelledby="location-moments-heading" className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="location-moments-heading"
          eyebrow="Moments from here"
          title="Life"
          accent="together."
          description={`See the events and shared moments connected to ${location.name}. Approved local albums will appear here as they become available.`}
        />

        <div className="mt-16">
          {timelineEvents.length ? (
            timelineEvents.map((event) => <TimelineEvent key={event.id} event={event} onOpenPhoto={viewer.open} />)
          ) : (
            <p className="rounded-2xl border border-dashed border-ink/15 p-6 text-muted-foreground">Photos from this location are coming soon.</p>
          )}
        </div>
      </Container>

      <PhotoLightbox
        photo={viewer.photo}
        collectionTitle={viewer.collection?.title}
        position={viewer.position}
        total={viewer.total}
        onClose={viewer.close}
        onPrevious={viewer.showPrevious}
        onNext={viewer.showNext}
      />
    </section>
  )
}

export default LocationPhotoTimeline

import { Images } from 'lucide-react'

import Container from '@/components/common/container'
import PageHero from '@/components/common/page-hero'
import PhotoLightbox from '@/components/common/photo-lightbox'
import PhotoTile from '@/components/common/photo-tile'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import usePhotoViewer from '@/hooks/use-photo-viewer'
import { getGalleryHref } from '@/lib/site-route'
import { cn } from '@/lib/utils'

// Bento spans keyed by the fixture's `size` hint.
const tileSpans = {
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  standard: '',
}

function GalleryEventView({ event }) {
  const viewer = usePhotoViewer()

  return (
    <main id="gallery-top">
      <PageHero backHref={getGalleryHref()} backLabel="Back to all events" eyebrow={event.label} title={event.title} description={event.description}>
        <Reveal delay={300} className="mt-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-cream/80 ring-1 ring-white/10">
            <Images className="size-4 text-ember" aria-hidden="true" />
            {event.photos.length} photos
          </span>
        </Reveal>
      </PageHero>

      <section aria-labelledby="photos-heading" className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="photos-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Photos</h2>
            <p className="max-w-md text-muted-foreground">Open any image to view it larger, then move through this event’s photos with the arrows or your keyboard.</p>
          </Reveal>

          <ul className="mt-12 grid auto-rows-[16rem] grid-flow-dense gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={`${event.title} photos`}>
            {event.photos.map((photo, index) => (
              <Reveal as="li" key={photo.id} delay={(index % 4) * 80} className={cn(tileSpans[photo.size])}>
                <PhotoTile photo={photo} label={`Open ${event.title} photo: ${photo.title}`} onOpen={() => viewer.open(event, index)} />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
            <p className="text-lg font-medium">Looking for another event?</p>
            <PillLink href={getGalleryHref()}>Back to all events</PillLink>
          </Reveal>
        </Container>
      </section>

      <PhotoLightbox
        photo={viewer.photo}
        collectionTitle={viewer.collection?.title}
        position={viewer.position}
        total={viewer.total}
        onClose={viewer.close}
        onPrevious={viewer.showPrevious}
        onNext={viewer.showNext}
      />
    </main>
  )
}

export default GalleryEventView

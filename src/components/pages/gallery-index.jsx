import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import EventAlbumCard from '@/components/common/event-album-card'
import PageHero from '@/components/common/page-hero'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import { galleryEvents } from '@/data/community'
import { getGalleryHref } from '@/lib/site-route'

function GalleryIndex() {
  return (
    <main id="gallery-top">
      <PageHero
        backHref="/#gallery"
        backLabel="Back to home"
        eyebrow="Gallery"
        title="Browse by"
        accent="event."
        description="Each gathering has its own story. Open an event album to see the moments that bring people together."
      />

      <section aria-labelledby="albums-heading" className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="albums-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Event albums</h2>
            <DraftNote>Illustrative previews will be replaced with approved YNS D6 photos as albums become available.</DraftNote>
          </Reveal>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Event albums">
            {galleryEvents.map((event, index) => (
              <Reveal as="li" key={event.id} delay={index * 100}>
                <EventAlbumCard event={event} href={getGalleryHref(event.id)} />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-8 text-cream sm:flex-row sm:items-center sm:p-10">
            <p className="text-2xl font-semibold tracking-tight">Want to be part of the next photo?</p>
            <PillLink href="/#contact" variant="glow">
              Connect with us
            </PillLink>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

export default GalleryIndex

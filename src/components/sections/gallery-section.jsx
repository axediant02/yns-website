import { ArrowUpRight } from 'lucide-react'

import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import EventAlbumCard from '@/components/common/event-album-card'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import { galleryContent } from '@/constants/home-content'
import { galleryEvents } from '@/data/community'
import { getGalleryHref } from '@/lib/site-route'

function GallerySection() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-cream py-24 sm:py-36">
      <Container>
        <SectionHeading id="gallery-heading" eyebrow={galleryContent.eyebrow} title={galleryContent.title} accent={galleryContent.accent} description={galleryContent.description}>
          <a href={getGalleryHref()} className="group mt-6 inline-flex items-center gap-2 rounded-full font-semibold">
            Go to gallery
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </SectionHeading>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Event album previews">
          {galleryEvents.map((event, index) => (
            <Reveal as="li" key={event.id} delay={index * 120} className={index === 1 ? 'lg:translate-y-10' : undefined}>
              <EventAlbumCard event={event} href={getGalleryHref(event.id)} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
          <DraftNote>{galleryContent.draftNote}</DraftNote>
          <PillLink href={getGalleryHref()}>See all photos</PillLink>
        </Reveal>
      </Container>
    </section>
  )
}

export default GallerySection

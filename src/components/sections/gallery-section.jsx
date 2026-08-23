import { ArrowUpRight } from 'lucide-react'

import EventAlbumCard from '@/components/common/event-album-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { galleryEvents } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function GallerySection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="gallery" className={`gallery-section section-frame reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-split">
          <div>
            <Badge className="eyebrow-badge eyebrow-light">Gallery</Badge>
            <h2>Room for<br /><em>the moments.</em></h2>
          </div>
          <div>
            <p>Browse the welcome, worship, and ordinary in-between moments that make each YNS D6 event feel like home.</p>
            <a className="section-text-link gallery-heading-link" href="#gallery-all">Go to gallery <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="gallery-event-grid" aria-label="Event album previews">
          {galleryEvents.map((event) => (
            <EventAlbumCard key={event.id} event={event} href={`#gallery-event-${event.id}`} />
          ))}
        </div>

        <div className="gallery-note">
          <p>Open an event album to see all of its moments.</p>
          <Button asChild className="gallery-see-all">
            <a href="#gallery-all">See all photos <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default GallerySection

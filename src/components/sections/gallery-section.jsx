import { ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { galleryPhotos } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

const galleryPreview = [
  galleryPhotos[0],
  galleryPhotos[1],
  galleryPhotos[8],
  galleryPhotos[9],
  galleryPhotos[2],
  galleryPhotos[10],
]

function GallerySection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="gallery" className={`gallery-section section-frame reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-split">
          <div>
            <Badge className="eyebrow-badge eyebrow-light">04 / Around here</Badge>
            <h2>Room for<br /><em>the moments.</em></h2>
          </div>
          <div>
            <p>A glimpse of the welcome, worship, and ordinary in-between moments that make a community feel like home.</p>
            <a className="section-text-link gallery-heading-link" href="#gallery-all">Go to gallery <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="gallery-grid" aria-label="Gallery previews">
          {galleryPreview.map((photo) => (
            <Card key={photo.id} className={`gallery-card gallery-card-${photo.size}`}>
              <CardContent>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <div className="gallery-card-caption"><span>{photo.category}</span><strong>{photo.title}</strong></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="gallery-note">
          <p>Explore more moments from Kids and Youth in the full gallery.</p>
          <Button asChild className="gallery-see-all">
            <a href="#gallery-all">See all photos <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default GallerySection

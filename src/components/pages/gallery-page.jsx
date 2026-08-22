import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { galleryPhotos } from '@/data/community'

const categoryLabels = {
  all: 'All photos',
  kids: 'Kids',
  youth: 'Youth',
}

function GalleryPhotoCard({ photo }) {
  return (
    <Card className={`gallery-photo-card gallery-photo-card-${photo.size}`}>
      <CardContent>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        <div className="gallery-photo-overlay">
          <span>{photo.category}</span>
          <strong>{photo.title}</strong>
        </div>
      </CardContent>
    </Card>
  )
}

function GalleryGroup({ category, title, description }) {
  const photos = galleryPhotos.filter((photo) => photo.category === category)

  return (
    <section id={`gallery-${category}`} className="gallery-group" aria-labelledby={`gallery-${category}-heading`}>
      <div className="gallery-group-heading">
        <div>
          <Badge className="eyebrow-badge eyebrow-light">{categoryLabels[category]}</Badge>
          <h2 id={`gallery-${category}-heading`}>{title}</h2>
        </div>
        <p>{description}</p>
      </div>
      <div className="gallery-photo-grid">
        {photos.map((photo) => <GalleryPhotoCard key={photo.id} photo={photo} />)}
      </div>
    </section>
  )
}

function GalleryPage() {
  const scrollToCategory = (category) => {
    const targetId = category === 'all' ? 'gallery-top' : `gallery-${category}`
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="gallery-page" id="gallery-top">
      <section className="gallery-page-hero section-frame">
        <div className="page-frame">
          <a className="gallery-back-link" href="#top"><ArrowLeft aria-hidden="true" /> Back to home</a>
          <div className="gallery-page-heading">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">Gallery / The moments</Badge>
              <h1>See the life<br /><em>around here.</em></h1>
            </div>
            <p>These illustrative stock photos capture the warmth, curiosity, and togetherness we hope every person experiences at YNS D6.</p>
          </div>
          <div className="gallery-filter-row" aria-label="Gallery categories">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <Button
                key={category}
                type="button"
                variant={category === 'all' ? 'default' : 'outline'}
                className={`gallery-filter gallery-filter-${category}`}
                onClick={() => scrollToCategory(category)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="gallery-page-content section-frame">
        <div className="page-frame">
          <GalleryGroup
            category="kids"
            title="For curious hearts."
            description="A welcoming space for kids to learn, play, and discover faith with others."
          />
          <GalleryGroup
            category="youth"
            title="For the next step."
            description="A place for young people to ask questions, build friendships, and follow Jesus together."
          />
          <div className="gallery-page-footer">
            <span>Want to be part of the next photo?</span>
            <Button asChild className="primary-action">
              <a href="#contact">Connect with us <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GalleryPage

import { ArrowUpRight } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

function EventAlbumCard({ event, href, className = '' }) {
  const previewPhotos = event.photos.slice(0, 3)

  return (
    <Card className={`event-album-card ${className}`}>
      <CardContent>
        <a className="event-album-card-link" href={href} aria-label={`Open ${event.title} photo album`}>
          <div className="event-album-stack" aria-hidden="true">
            {previewPhotos.map((photo, index) => (
              <img key={photo.id} className={`event-album-stack-image event-album-stack-image-${index + 1}`} src={photo.src} alt="" loading="lazy" decoding="async" />
            ))}
            <span className="event-album-count">{event.photos.length} photos</span>
          </div>
          <div className="event-album-card-caption">
            <div>
              <span>{event.label}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </div>
        </a>
      </CardContent>
    </Card>
  )
}

export default EventAlbumCard

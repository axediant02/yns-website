import { useState } from 'react'

import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import EventAlbumCard from '@/components/common/event-album-card'
import PhotoLightbox from '@/components/common/photo-lightbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { galleryEvents } from '@/data/community'

function GalleryPhotoCard({ photo, eventTitle, onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(photo.id)
    }
  }

  return (
    <Card
      className={`gallery-photo-card gallery-photo-card-${photo.size}`}
      role="button"
      tabIndex="0"
      aria-label={`Open ${eventTitle} photo: ${photo.title}`}
      onClick={() => onOpen(photo.id)}
      onKeyDown={handleKeyDown}
    >
      <CardContent>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        <div className="gallery-photo-overlay">
          <strong>{photo.title}</strong>
        </div>
      </CardContent>
    </Card>
  )
}

function GalleryEventIndex() {
  return (
    <main className="gallery-page" id="gallery-top">
      <section className="gallery-page-hero section-frame">
        <div className="page-frame">
          <a className="gallery-back-link" href="#top"><ArrowLeft aria-hidden="true" /> Back to home</a>
          <div className="gallery-page-heading">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">Gallery</Badge>
              <h1>Browse by<br /><em>event.</em></h1>
            </div>
            <p>Each gathering has its own story. Open an event album to see the moments that bring people together.</p>
          </div>
        </div>
      </section>

      <div className="gallery-page-content section-frame">
        <div className="page-frame">
          <div className="gallery-event-index-heading">
            <h2 className="gallery-subheading">Event albums</h2>
            <p>Illustrative previews will be replaced with approved YNS D6 photos as albums become available.</p>
          </div>
          <div className="gallery-event-index-grid" aria-label="Event albums">
            {galleryEvents.map((event) => (
              <EventAlbumCard key={event.id} event={event} href={`#gallery-event-${event.id}`} />
            ))}
          </div>
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

function GalleryEventNotFound() {
  return (
    <main className="gallery-page" id="gallery-top">
      <section className="gallery-page-hero gallery-event-not-found section-frame">
        <div className="page-frame">
          <Badge className="eyebrow-badge eyebrow-dark">Gallery</Badge>
          <h1>That album<br /><em>is not here.</em></h1>
          <p>Return to the event albums to choose another collection of moments.</p>
          <Button asChild className="primary-action">
            <a href="#gallery-all">Back to all events <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </div>
      </section>
    </main>
  )
}

function GalleryEventView({ event }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  const selectedPhoto = selectedPhotoIndex === null ? null : event.photos[selectedPhotoIndex]
  const openPhoto = (photoId) => setSelectedPhotoIndex(event.photos.findIndex((photo) => photo.id === photoId))
  const closePhoto = () => setSelectedPhotoIndex(null)
  const showPreviousPhoto = () => setSelectedPhotoIndex((index) => (index - 1 + event.photos.length) % event.photos.length)
  const showNextPhoto = () => setSelectedPhotoIndex((index) => (index + 1) % event.photos.length)

  return (
    <main className="gallery-page gallery-event-page" id="gallery-top">
      <section className="gallery-page-hero section-frame">
        <div className="page-frame">
          <a className="gallery-back-link" href="#gallery-all"><ArrowLeft aria-hidden="true" /> Back to all events</a>
          <div className="gallery-page-heading">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">{event.label}</Badge>
              <h1>{event.title}</h1>
            </div>
            <p>{event.description}</p>
          </div>
          <div className="gallery-event-meta">
            <span>{event.photos.length} photos</span>
          </div>
        </div>
      </section>

      <div className="gallery-page-content section-frame">
        <div className="page-frame">
          <div className="gallery-event-photo-heading">
            <h2 className="gallery-subheading">Photos</h2>
            <p>Open any image to view it larger, then move through this event’s photos with the arrows or your keyboard.</p>
          </div>
          <div className="gallery-photo-grid" aria-label={`${event.title} photos`}>
            {event.photos.map((photo) => (
              <GalleryPhotoCard key={photo.id} photo={photo} eventTitle={event.title} onOpen={openPhoto} />
            ))}
          </div>
          <div className="gallery-page-footer">
            <span>Looking for another event?</span>
            <Button asChild className="primary-action">
              <a href="#gallery-all">Back to all events <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </div>
      <PhotoLightbox
        photo={selectedPhoto}
        collectionTitle={event.title}
        onClose={closePhoto}
        onPrevious={showPreviousPhoto}
        onNext={showNextPhoto}
      />
    </main>
  )
}

function GalleryPage({ route }) {
  if (route.type === 'index') return <GalleryEventIndex />

  const event = galleryEvents.find((galleryEvent) => galleryEvent.id === route.eventId)
  return event ? <GalleryEventView event={event} /> : <GalleryEventNotFound />
}

export default GalleryPage

import { useState } from 'react'

import PhotoLightbox from '@/components/common/photo-lightbox'
import { Badge } from '@/components/ui/badge'
import { galleryEvents, locationPhotoPreviews } from '@/data/community'

function formatEventDate(date) {
  if (!date) return 'Date to be confirmed'

  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`))
}

function LocationPhotoTimeline({ location }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const verifiedEvents = galleryEvents.filter((event) => event.locationIds?.includes(location.id))
  const preview = locationPhotoPreviews.find((event) => event.locationIds.includes(location.id))
  const timelineEvents = [...verifiedEvents, ...(preview ? [preview] : [])]

  const openPhoto = (event, photoIndex) => setSelectedPhoto({ event, photoIndex })
  const selectedEvent = selectedPhoto?.event
  const selectedImage = selectedEvent ? selectedEvent.photos[selectedPhoto.photoIndex] : null
  const showPreviousPhoto = () => setSelectedPhoto((current) => ({
    event: current.event,
    photoIndex: (current.photoIndex - 1 + current.event.photos.length) % current.event.photos.length,
  }))
  const showNextPhoto = () => setSelectedPhoto((current) => ({
    event: current.event,
    photoIndex: (current.photoIndex + 1) % current.event.photos.length,
  }))

  return (
    <section className="location-photo-timeline section-frame">
      <div className="page-frame">
        <div className="location-timeline-heading">
          <div>
            <Badge className="eyebrow-badge">Moments from here</Badge>
            <h2>Life<br /><em>together.</em></h2>
          </div>
          <p>See the events and shared moments connected to {location.name}. Approved local albums will appear here as they become available.</p>
        </div>

        {timelineEvents.length ? (
          <div className="location-timeline-list">
            {timelineEvents.map((event) => (
              <article className="location-timeline-item" key={event.id}>
                <div className="location-timeline-item-heading">
                  <div>
                    <Badge className={event.isIllustrative ? 'eyebrow-badge eyebrow-dark' : 'eyebrow-badge'}>
                      {event.isIllustrative ? 'Illustrative preview' : event.label}
                    </Badge>
                    <h3>{event.title}</h3>
                  </div>
                  <time dateTime={event.date || undefined}>{formatEventDate(event.date)}</time>
                </div>
                <p>{event.description}</p>
                <div className="location-timeline-grid" aria-label={`${event.title} photos`}>
                  {event.photos.map((photo, photoIndex) => (
                    <button type="button" className="location-timeline-photo" key={photo.id} onClick={() => openPhoto(event, photoIndex)} aria-label={`Open ${event.title} photo: ${photo.title}`}>
                      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                      <span>{photo.title}</span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="location-timeline-empty">Photos from this location are coming soon.</p>
        )}
      </div>

      <PhotoLightbox
        photo={selectedImage}
        collectionTitle={selectedEvent?.title}
        onClose={() => setSelectedPhoto(null)}
        onPrevious={showPreviousPhoto}
        onNext={showNextPhoto}
      />
    </section>
  )
}

export default LocationPhotoTimeline

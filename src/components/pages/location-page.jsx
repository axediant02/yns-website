import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, ExternalLink, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import LocationPhotoTimeline from '@/components/sections/location-photo-timeline'
import { community } from '@/data/community'
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl, getLocationBySlug } from '@/lib/location-routes'

function LocationPage({ slug }) {
  const location = getLocationBySlug(slug)

  if (!location) {
    return (
      <main className="location-page" id="location-top">
        <section className="location-page-hero location-not-found section-frame">
          <div className="page-frame">
            <Badge className="eyebrow-badge eyebrow-dark">Location</Badge>
            <h1>We could not find<br /><em>that place.</em></h1>
            <p>Choose one of our listed locations to find gathering details and directions.</p>
            <Button asChild className="location-page-action">
              <a href="/#gathering">See all locations <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="location-page" id="location-top">
      <section className="location-page-hero section-frame">
        <div className="page-frame">
          <a className="location-back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to home</a>
          <div className="location-page-heading">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">Your local gathering</Badge>
              <h1>{location.name}<br /><em>{location.area.split(',')[0]}.</em></h1>
            </div>
            <p>{location.welcomeMessage || 'Local welcome message coming soon. Everyone interested is welcome to learn more and ask questions.'}</p>
          </div>
        </div>
      </section>

      <section className="location-page-content section-frame">
        <div className="page-frame">
          <div className="location-detail-grid">
            <Card className="location-detail-card">
              <CardContent>
                <Badge className="eyebrow-badge">Gathering details</Badge>
                <h2>See you<br /><em>Sunday.</em></h2>
                <div className="location-detail-facts">
                  <div><CalendarDays aria-hidden="true" /><span><small>When</small><strong>{community.gathering.day}</strong></span></div>
                  <div><Clock3 aria-hidden="true" /><span><small>Time</small><strong>{community.gathering.time}</strong></span></div>
                  <div><MapPin aria-hidden="true" /><span><small>Where</small><strong>{location.venue || 'Verified venue details coming soon.'}</strong><small>{location.address || `${location.name}, ${location.area}`}</small></span></div>
                </div>
                <p className="location-draft-note">Draft content: local venue, arrival, and contact details will be added once verified.</p>
                <Button asChild className="location-page-action">
                  <a href="/#contact">Ask a question <ArrowUpRight aria-hidden="true" /></a>
                </Button>
              </CardContent>
            </Card>

            <div className="location-map-card">
              <div className="location-page-map-wrap">
                <iframe
                  title={`Map showing ${location.name}, ${location.area}`}
                  src={getGoogleMapsEmbedUrl(location.mapQuery)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="location-page-map-details">
                <div>
                  <span className="footer-label">Find your way</span>
                  <h2>{location.name}</h2>
                  <p>{location.area}</p>
                </div>
                <a className="location-directions" href={getGoogleMapsUrl(location.mapQuery)} target="_blank" rel="noreferrer">
                  Open directions <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {location.image?.src ? <img className="location-page-photo" src={location.image.src} alt={location.image.alt || `Gathering in ${location.name}`} loading="lazy" /> : null}

          <div className="location-expectations">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">What to expect</Badge>
              <h2>{community.gathering.welcome}</h2>
            </div>
            <div className="location-expectations-copy">
              <p>{community.gathering.firstTimeGuidance}</p>
              {location.arrivalNotes ? <p><strong>Arrival notes:</strong> {location.arrivalNotes}</p> : null}
              {location.contact?.href ? <a className="location-directions" href={location.contact.href} target="_blank" rel="noreferrer">Contact the local coordinator <ExternalLink aria-hidden="true" /></a> : null}
              {!location.arrivalNotes && !location.contact?.href ? <p className="location-draft-note-light">Local arrival notes and contact details will be added after verification.</p> : null}
            </div>
          </div>

          <div className="location-page-footer">
            <span>Not sure what to expect? That is okay.</span>
            <a href="/#gathering">View all Cebu locations <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <LocationPhotoTimeline location={location} />
    </main>
  )
}

export default LocationPage

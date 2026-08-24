import { ArrowUpRight, CalendarDays, Clock3, ExternalLink, MapPin, UsersRound } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { community, locations } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from '@/lib/location-routes'

function GatheringSection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="gathering" className={`gathering-section section-frame reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-split">
          <div>
            <Badge className="eyebrow-badge">Gathering</Badge>
            <h2>Start with<br /><em>Sunday.</em></h2>
          </div>
          <p>Come for the gathering. Stay for the people, the questions, and the possibility of a life shaped by Jesus.</p>
        </div>

        <Card className="gathering-card">
          <CardHeader className="gathering-card-top">
            <div className="gathering-date-mark">
              <span>SUN</span>
              <strong>01</strong>
            </div>
            <div>
              <Badge variant="outline">Sunday gathering</Badge>
              <h3>{community.gathering.welcome}</h3>
            </div>
            <span className="gathering-card-arrow"><ArrowUpRight aria-hidden="true" /></span>
          </CardHeader>
          <CardContent className="gathering-card-content">
            <div className="gathering-fact">
              <CalendarDays aria-hidden="true" />
              <span><small>When</small><strong>{community.gathering.day}</strong></span>
            </div>
            <div className="gathering-fact">
              <Clock3 aria-hidden="true" />
              <span><small>Time</small><strong>{community.gathering.time}</strong></span>
            </div>
            <div className="gathering-fact">
              <MapPin aria-hidden="true" />
              <span><small>Where</small><strong>{community.gathering.venue}</strong></span>
            </div>
            <div className="gathering-fact">
              <UsersRound aria-hidden="true" />
              <span><small>Who</small><strong>{community.audience}</strong></span>
            </div>
          </CardContent>
          <div className="gathering-card-footer">
            <span>Not sure what to expect? That is okay.</span>
            <Button asChild variant="secondary">
              <a href="#contact">Ask a question <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </Card>

        <div className="locations-directory">
          <div className="locations-directory-heading">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">Locations</Badge>
              <h3>Gather with us<br /><em>near you.</em></h3>
            </div>
            <p>Choose the location closest to you. These map previews are approximate and will be updated with verified venue details.</p>
          </div>

          <div className="location-grid">
            {locations.map((location) => (
              <Card className="location-card" key={location.id}>
                <CardContent className="location-card-content">
                  <div className="location-map-wrap">
                    <iframe
                      title={`Map showing ${location.name}, ${location.area}`}
                      src={getGoogleMapsEmbedUrl(location.mapQuery)}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="location-card-details">
                    <div>
                      <h3>{location.name}</h3>
                      <p>{location.area}</p>
                    </div>
                    <div className="location-card-schedule">
                      <span className="footer-label">{community.gathering.day}</span>
                      <strong>{community.gathering.time}</strong>
                    </div>
                    <a className="location-directions" href={getGoogleMapsUrl(location.mapQuery)} target="_blank" rel="noreferrer">
                      Open directions <ExternalLink aria-hidden="true" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="gathering-note">
          <span>FIRST TIME?</span>
          <p>{community.gathering.firstTimeGuidance}</p>
        </div>
      </div>
    </section>
  )
}

export default GatheringSection

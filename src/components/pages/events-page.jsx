import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { locations } from '@/data/community'
import { getLocationHref } from '@/lib/location-routes'

function EventsPage() {
  return (
    <main className="events-page" id="events-top">
      <section className="events-page-hero section-frame">
        <div className="page-frame">
          <a className="events-back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to home</a>
          <div className="events-page-heading">
            <div>
              <Badge className="eyebrow-badge eyebrow-dark">Events</Badge>
              <h1>More events<br /><em>coming soon.</em></h1>
            </div>
            <p>We are making room for verified gatherings, camps, and shared moments from across the YNS D6 community.</p>
          </div>
        </div>
      </section>

      <section className="events-page-content section-frame">
        <div className="page-frame">
          <Card className="events-coming-soon-card">
            <CardContent>
              <div className="events-coming-soon-icon" aria-hidden="true"><CalendarDays /></div>
              <div>
                <Badge className="eyebrow-badge">Coming soon</Badge>
                <h2>Verified event details<br /><em>will be here.</em></h2>
                <p>Event names, dates, locations, and photos will be added once they are confirmed by the community.</p>
              </div>
            </CardContent>
          </Card>

          <div className="events-location-directory">
            <div className="events-location-heading">
              <div>
                <Badge className="eyebrow-badge eyebrow-dark">Find your location</Badge>
                <h2>Start<br /><em>near you.</em></h2>
              </div>
              <p>Choose a YNS D6 location to see its gathering details, photo timeline, and future local events.</p>
            </div>

            <div className="events-location-grid">
              {locations.map((location) => (
                <a className="events-location-card" key={location.id} href={getLocationHref(location)}>
                  <span className="events-location-card-icon"><MapPin aria-hidden="true" /></span>
                  <span>
                    <strong>{location.name}</strong>
                    <small>{location.area}</small>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>

            <Button asChild className="events-home-action">
              <a href="/#gathering">View all gathering locations <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default EventsPage

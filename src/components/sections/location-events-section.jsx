import { Badge } from '@/components/ui/badge'

function LocationEventsSection({ location }) {
  return (
    <section id="location-events" className="location-events-section section-frame" aria-labelledby="location-events-heading">
      <div className="page-frame">
        <div className="location-events-heading">
          <div>
            <Badge className="eyebrow-badge eyebrow-dark">Events</Badge>
            <h2 id="location-events-heading">More events<br /><em>coming soon.</em></h2>
          </div>
          <div className="location-events-copy">
            <p>Verified events for the {location.name} gathering will be shared here as dates, details, and photos become available.</p>
            <span>Event details are coming soon.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationEventsSection

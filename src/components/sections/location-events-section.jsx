import { CalendarClock } from 'lucide-react'

import Container from '@/components/common/container'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'

function LocationEventsSection({ location }) {
  return (
    <section id="location-events" aria-labelledby="location-events-heading" className="bg-ink py-20 text-cream sm:py-28">
      <Container>
        <SectionHeading
          id="location-events-heading"
          tone="light"
          eyebrow="Events"
          title="More events"
          accent="coming soon."
          description={`Verified events for the ${location.name} gathering will be shared here as dates, details, and photos become available.`}
        />
        <Reveal className="mt-12 flex items-center gap-4 rounded-2xl border border-dashed border-white/15 p-6 text-cream/60">
          <CalendarClock className="size-6 shrink-0 text-ember" aria-hidden="true" />
          Event details are coming soon.
        </Reveal>
      </Container>
    </section>
  )
}

export default LocationEventsSection

import ClientLink from '@/components/common/client-link'
import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import EventCard from '@/components/common/event-card'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import { eventsContent } from '@/constants/home-content'
import { upcomingEvents } from '@/data/upcoming-events'

function EventsSection({ events = upcomingEvents }) {
  return (
    <section id="events" aria-labelledby="events-heading" className="bg-sand/60 py-24 sm:py-36">
      <Container>
        <SectionHeading id="events-heading" eyebrow={eventsContent.eyebrow} title={eventsContent.title} accent={eventsContent.accent} description={eventsContent.description} />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Upcoming events">
          {events.slice(0, 3).map((event, index) => (
            <Reveal as="li" key={event.id} delay={index * 120} className="md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-0.625rem)] lg:last:col-span-1 lg:last:w-auto">
              <EventCard event={event} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
          <DraftNote>{eventsContent.draftNote}</DraftNote>
          <PillLink href="/events" as={ClientLink}>See all events</PillLink>
        </Reveal>
      </Container>
    </section>
  )
}

export default EventsSection

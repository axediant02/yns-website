import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import ClientLink from '@/components/common/client-link'
import Container from '@/components/common/container'
import PillLink from '@/components/common/pill-link'
import PageHero from '@/components/common/page-hero'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import { locations } from '@/data/community'
import { getLocationHref } from '@/lib/location-routes'

function EventsPage() {
  return (
    <main id="events-top">
      <PageHero
        backHref="/"
        backLabel="Back to home"
        eyebrow="Events"
        title="More events"
        accent="coming soon."
        description="We are making room for verified gatherings, camps, and shared moments from across the YNS D6 community."
      />

      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal className="relative flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-white p-8 ring-1 ring-ink/10 sm:flex-row sm:items-center sm:p-12">
            <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-linear-to-br from-ember via-dawn to-iris text-ink" aria-hidden="true">
              <CalendarDays className="size-9" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Verified event details will be here.</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                Event names, dates, locations, and photos will be added once they are confirmed by the community.
              </p>
            </div>
          </Reveal>

          <div className="mt-28">
            <SectionHeading
              eyebrow="Find your location"
              title="Start"
              accent="near you."
              description="Choose a YNS D6 location to see its gathering details, photo timeline, and future local events."
            />
            <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {locations.map((location, index) => (
                <Reveal as="li" key={location.id} delay={(index % 4) * 80}>
                  <ClientLink
                    href={getLocationHref(location)}
                    className="group flex h-full flex-col justify-between gap-10 rounded-3xl bg-white p-6 ring-1 ring-ink/10 transition-all duration-500 hover:-translate-y-1 hover:bg-ink hover:text-cream"
                  >
                    <span className="flex items-center justify-between">
                      <MapPin className="size-5 text-dawn transition-colors group-hover:text-ember" aria-hidden="true" />
                      <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block text-xl font-semibold tracking-tight">{location.name}</strong>
                      <span className="mt-1 block text-sm opacity-60">{location.area}</span>
                    </span>
                  </ClientLink>
                </Reveal>
              ))}
            </ul>
            <PillLink href="/#gathering" className="mt-12">
              View all gathering locations
            </PillLink>
          </div>
        </Container>
      </section>
    </main>
  )
}

export default EventsPage

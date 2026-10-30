import { CalendarDays, Clock3, ExternalLink, MapPin } from 'lucide-react'

import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import Eyebrow from '@/components/common/eyebrow'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import { community } from '@/data/community'
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from '@/lib/location-routes'

function DetailFact({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4 border-t border-ink/10 py-5">
      <Icon className="mt-0.5 size-5 shrink-0 text-dawn" aria-hidden="true" />
      <div>
        <dt className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">{label}</dt>
        <dd className="mt-1 font-medium">{children}</dd>
      </div>
    </div>
  )
}

/** Gathering facts and map for a single location page. */
function LocationDetails({ location }) {
  return (
    <section id="location-content" aria-labelledby="location-details-heading" className="bg-cream py-20 sm:py-28">
      <Container className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="rounded-[2rem] bg-white p-8 ring-1 ring-ink/10 sm:p-10">
          <Eyebrow>Gathering details</Eyebrow>
          <h2 id="location-details-heading" className="mt-6 text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-5xl">
            See you <span className="text-dawn">Sunday.</span>
          </h2>
          <dl className="mt-8">
            <DetailFact icon={CalendarDays} label="When">{community.gathering.day}</DetailFact>
            <DetailFact icon={Clock3} label="Time">{community.gathering.time}</DetailFact>
            <DetailFact icon={MapPin} label="Where">
              {location.venue || 'Verified venue details coming soon.'}
              <span className="block text-sm font-normal text-muted-foreground">{location.address || `${location.name}, ${location.area}`}</span>
            </DetailFact>
          </dl>
          <DraftNote className="mt-4">Draft content: local venue, arrival, and contact details will be added once verified.</DraftNote>
          <PillLink href="/#contact" className="mt-8 flex w-fit">
            Ask a question
          </PillLink>
        </Reveal>

        <Reveal delay={120} className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-sand ring-1 ring-ink/10">
          <iframe
            title={`Map showing ${location.name}, ${location.area}`}
            src={getGoogleMapsEmbedUrl(location.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full"
          />
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-ink/85 p-5 text-cream backdrop-blur-xl sm:inset-x-4 sm:bottom-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-ember uppercase">Find your way</p>
              <p className="mt-1 text-xl font-semibold">{location.name}</p>
              <p className="text-sm text-cream/60">{location.area}</p>
            </div>
            <PillLink href={getGoogleMapsUrl(location.mapQuery)} target="_blank" rel="noreferrer" variant="cream" icon={ExternalLink} className="h-10 px-4">
              Open directions
              <span className="sr-only"> (opens in a new tab)</span>
            </PillLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default LocationDetails

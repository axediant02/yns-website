import { ExternalLink } from 'lucide-react'

import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import Eyebrow from '@/components/common/eyebrow'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import { community } from '@/data/community'

/** First-visit guidance and local arrival/contact details when verified. */
function LocationExpectations({ location }) {
  const hasLocalDetails = location.arrivalNotes || location.contact?.href

  return (
    <section aria-labelledby="location-expect-heading" className="bg-sand py-20 sm:py-28">
      <Container>
        {location.image?.src ? (
          <Reveal className="mb-16 overflow-hidden rounded-[2rem]">
            <img src={location.image.src} alt={location.image.alt || `Gathering in ${location.name}`} loading="lazy" className="aspect-[21/9] w-full object-cover" />
          </Reveal>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <h2 id="location-expect-heading" className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
              {community.gathering.welcome}
            </h2>
          </Reveal>
          <Reveal delay={120} className="grid gap-5 text-lg leading-relaxed text-ink/75">
            <p>{community.gathering.firstTimeGuidance}</p>
            {location.arrivalNotes ? (
              <p>
                <strong className="text-ink">Arrival notes:</strong> {location.arrivalNotes}
              </p>
            ) : null}
            {location.contact?.href ? (
              <PillLink href={location.contact.href} target="_blank" rel="noreferrer" icon={ExternalLink} className="w-fit">
                Contact the local coordinator
              </PillLink>
            ) : null}
            {!hasLocalDetails ? <DraftNote>Local arrival notes and contact details will be added after verification.</DraftNote> : null}
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-lg font-medium">Not sure what to expect? That is okay.</p>
          <PillLink href="/#gathering">View all Cebu locations</PillLink>
        </Reveal>
      </Container>
    </section>
  )
}

export default LocationExpectations

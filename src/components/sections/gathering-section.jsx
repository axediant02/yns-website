import { CalendarDays, Clock3, MapPin, UsersRound } from 'lucide-react'

import contoursUrl from '@/assets/art/contours.svg'
import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import GatheringCountdown from '@/components/sections/gathering-countdown'
import LocationExplorer from '@/components/sections/location-explorer'
import { gatheringContent } from '@/constants/home-content'
import { community } from '@/data/community'

const facts = [
  { icon: CalendarDays, label: 'When', value: community.gathering.day },
  { icon: Clock3, label: 'Time', value: community.gathering.time },
  { icon: MapPin, label: 'Where', value: community.gathering.venue },
  { icon: UsersRound, label: 'Who', value: community.audience },
]

function GatheringSection() {
  return (
    <section id="gathering" aria-labelledby="gathering-heading" className="relative isolate overflow-hidden bg-ink py-24 text-cream sm:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ember/25"
        style={{ maskImage: `url(${contoursUrl})`, maskSize: 'cover', maskPosition: 'center', WebkitMaskImage: `url(${contoursUrl})`, WebkitMaskSize: 'cover' }}
      />
      <Container>
        <SectionHeading id="gathering-heading" tone="light" eyebrow={gatheringContent.eyebrow} title={gatheringContent.title} accent={gatheringContent.accent} description={gatheringContent.description} />

        <div className="mt-16 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="glow-border rounded-[2rem] bg-ink-soft/80 p-6 backdrop-blur sm:p-10">
            <GatheringCountdown />
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cream/50 uppercase">
                    <Icon className="size-3.5 text-ember" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-2 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-between gap-8 rounded-[2rem] bg-linear-to-br from-ember via-dawn to-iris p-8 text-ink sm:p-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-70">First time?</p>
              <p className="mt-5 text-xl leading-snug font-medium tracking-tight">{community.gathering.firstTimeGuidance}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">{gatheringContent.reassurance}</p>
              <PillLink href="#contact" variant="ink" className="mt-4">
                Ask a question
              </PillLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-28">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h3 className="max-w-md text-[clamp(2rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.04em]">{gatheringContent.locationsTitle}</h3>
            <DraftNote tone="light" className="max-w-sm">{gatheringContent.locationsNote}</DraftNote>
          </Reveal>
          <LocationExplorer />
        </div>
      </Container>
    </section>
  )
}

export default GatheringSection

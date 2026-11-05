import { CalendarDays, MapPin, UsersRound } from 'lucide-react'

import AuroraBackdrop from '@/components/common/aurora-backdrop'
import Container from '@/components/common/container'
import Eyebrow from '@/components/common/eyebrow'
import PillLink from '@/components/common/pill-link'
import SplitText from '@/components/common/split-text'
import HeroLocationTicker from '@/components/sections/hero-location-ticker'
import { heroContent } from '@/constants/home-content'
import { community } from '@/data/community'
import usePointerSpotlight from '@/hooks/use-pointer-spotlight'

const heroFacts = [
  { icon: CalendarDays, label: `${community.gathering.day} · ${community.gathering.time}` },
  { icon: MapPin, label: community.gathering.venue },
  { icon: UsersRound, label: community.gathering.welcome },
]

/** Full-screen opening section. Entrance animations start once `isReady` is true. */
function HeroSection({ isReady }) {
  const spotlightRef = usePointerSpotlight()
  const [firstLine, secondLine] = heroContent.titleLines
  const secondLineStart = firstLine.split(' ').length

  return (
    <section
      id="top"
      ref={spotlightRef}
      data-ready={isReady}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-cream"
    >
      <AuroraBackdrop showHalo haloClassName="top-[44%]" />

      <Container className="relative flex flex-1 flex-col items-center justify-center pt-32 pb-12 text-center">
        <div className="stage-in" style={{ '--stage-delay': '0ms' }}>
          <Eyebrow tone="light">{heroContent.eyebrow}</Eyebrow>
        </div>

        <h1 id="hero-heading" className="mt-8 text-[clamp(3.25rem,11vw,9.5rem)] leading-[0.9] font-semibold tracking-[-0.06em]">
          <SplitText text={firstLine} delay={150} className="block" />
          {' '}
          <SplitText text={secondLine} startIndex={secondLineStart} delay={150} className="block pb-2" wordClassName="text-dawn" />
        </h1>

        <p className="stage-in mt-8 max-w-xl text-lg leading-relaxed text-pretty text-cream/70 sm:text-xl" style={{ '--stage-delay': '650ms' }}>
          {heroContent.description}
        </p>

        <div className="stage-in mt-10 flex flex-col items-center gap-3 sm:flex-row" style={{ '--stage-delay': '800ms' }}>
          <PillLink href={heroContent.primaryAction.href} variant="glow" className="h-14 px-8 text-base">
            {heroContent.primaryAction.label}
          </PillLink>
          <PillLink href={heroContent.secondaryAction.href} variant="ghostLight" className="h-14 px-7 text-base">
            {heroContent.secondaryAction.label}
          </PillLink>
        </div>

        <ul aria-label="Gathering details" className="stage-in mt-12 flex flex-wrap justify-center gap-2" style={{ '--stage-delay': '950ms' }}>
          {heroFacts.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-cream/80 ring-1 ring-white/10 backdrop-blur-md">
              <Icon className="size-4 text-ember" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Container>

      <div className="stage-in relative" style={{ '--stage-delay': '1100ms' }}>
        <HeroLocationTicker />
      </div>
    </section>
  )
}

export default HeroSection

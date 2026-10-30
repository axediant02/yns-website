import { HeartHandshake, Sparkles } from 'lucide-react'

import Container from '@/components/common/container'
import Eyebrow from '@/components/common/eyebrow'
import Reveal from '@/components/common/reveal'
import ScrollHighlightText from '@/components/common/scroll-highlight-text'
import AboutStatements from '@/components/sections/about-statements'
import { aboutContent } from '@/constants/home-content'

const pillarIcons = { heart: HeartHandshake, sparkles: Sparkles }

function AboutPillar({ pillar, index }) {
  const Icon = pillarIcons[pillar.icon]

  return (
    <Reveal delay={index * 120} className="group relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-ink/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_oklch(0.17_0.028_268/50%)] sm:p-10">
      <div aria-hidden="true" className="absolute -top-24 -right-24 size-56 rounded-full bg-linear-to-br from-ember/30 via-dawn/20 to-iris/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-ink text-ember transition-transform duration-500 group-hover:-rotate-6">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="relative mt-10 text-2xl font-semibold tracking-tight sm:text-3xl">{pillar.title}</h3>
      <p className="relative mt-3 max-w-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
    </Reveal>
  )
}

function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden bg-cream py-24 sm:py-36">
      <Container>
        <Reveal>
          <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
          <h2 id="about-heading" className="mt-6 text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
            {aboutContent.title}
            {' '}
            <span className="text-dawn block pb-1">{aboutContent.accent}</span>
          </h2>
        </Reveal>

        <ScrollHighlightText
          text={aboutContent.statement}
          className="mt-14 max-w-5xl text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.15] font-medium tracking-[-0.03em]"
        />

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {aboutContent.pillars.map((pillar, index) => (
            <AboutPillar key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>

        <AboutStatements />
      </Container>
    </section>
  )
}

export default AboutSection

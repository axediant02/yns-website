import { Compass, Target } from 'lucide-react'

import Eyebrow from '@/components/common/eyebrow'
import Reveal from '@/components/common/reveal'
import { aboutStatementsContent } from '@/constants/about-statements-content'
import { community } from '@/data/community'
import { cn } from '@/lib/utils'

function StatementPanel({ title, number, icon: Icon, dark = false, children }) {
  return (
    <Reveal as="article" aria-labelledby={`about-statement-${number}`} className={cn('relative min-w-0 overflow-hidden rounded-[2rem] p-7 sm:p-10', dark ? 'bg-ink text-cream' : 'bg-white text-ink ring-1 ring-ink/10')}>
      <div className="flex items-center justify-between gap-4">
        <span className={cn('grid size-12 place-items-center rounded-2xl', dark ? 'bg-cream/10 text-ember' : 'bg-dawn/10 text-dawn')}>
          <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span aria-hidden="true" className={cn('font-mono text-xs tracking-[0.2em]', dark ? 'text-cream/40' : 'text-ink/40')}>{number}</span>
      </div>
      <h3 id={`about-statement-${number}`} className="mt-8 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h3>
      <div aria-hidden="true" className={cn('mt-5 h-px w-12', dark ? 'bg-ember/70' : 'bg-dawn/60')} />
      <p className={cn('mt-6 text-base leading-[1.85] text-pretty break-words', dark ? 'text-cream/75' : 'text-muted-foreground')}>{children}</p>
    </Reveal>
  )
}

/** Supplied mission, vision and values, composed in the website's editorial style. */
function AboutStatements({ identity = community }) {
  return (
    <section id="about-foundation" aria-labelledby="about-foundation-heading" className="mt-20 border-t border-ink/10 pt-16 sm:mt-24 sm:pt-20">
      <Reveal className="mb-10 max-w-2xl">
        <Eyebrow>{aboutStatementsContent.eyebrow}</Eyebrow>
        <h2 id="about-foundation-heading" className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
          {aboutStatementsContent.title} <span className="text-dawn">{aboutStatementsContent.accent}</span>
        </h2>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        <StatementPanel title={aboutStatementsContent.mission} number="01" icon={Target}>{identity.mission}</StatementPanel>
        <StatementPanel title={aboutStatementsContent.vision} number="02" icon={Compass} dark>{identity.vision}</StatementPanel>
      </div>

      <Reveal as="section" aria-labelledby="about-values-heading" className="mt-5 grid gap-8 rounded-[2rem] bg-sand/80 p-7 sm:p-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
        <header className="max-w-xs">
          <span aria-hidden="true" className="font-mono text-xs tracking-[0.2em] text-ink/40">03</span>
          <h3 id="about-values-heading" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{aboutStatementsContent.values}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{aboutStatementsContent.valuesIntroduction}</p>
        </header>
        <ol className="grid min-w-0 gap-x-8 sm:grid-cols-2" aria-label={aboutStatementsContent.values}>
          {identity.coreValues.map((value, index) => (
            <li key={value} className="min-w-0 border-t border-ink/15 pt-5 pb-6">
              <span aria-hidden="true" className="font-mono text-xs font-medium text-dawn">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-3 text-sm leading-relaxed text-pretty break-words text-ink/80 sm:text-base">{value}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}

export default AboutStatements

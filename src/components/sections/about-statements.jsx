import { ArrowUpRight } from 'lucide-react'

import OrnamentDivider from '@/components/common/ornament-divider'
import Reveal from '@/components/common/reveal'
import RoyalFrame from '@/components/common/royal-frame'
import { community } from '@/data/community'

const NUMERALS = ['I', 'II', 'III', 'IV']
const DROP_CAP = 'first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-[3.6em] first-letter:leading-[0.8] first-letter:text-gold first-letter:[text-shadow:0_0_28px_oklch(0.83_0.16_80/45%)]'

/** One chapter of the charter: Roman numeral and title beside its text. */
function Chapter({ numeral, title, children }) {
  return (
    <Reveal as="article" className="grid gap-6 py-12 sm:py-16 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <header className="flex items-baseline gap-5 lg:flex-col lg:gap-4">
        <span aria-hidden="true" className="text-gold-foil font-serif text-6xl leading-none italic sm:text-7xl">{numeral}</span>
        <h3 className="text-xs font-semibold tracking-[0.4em] text-gold uppercase">{title}</h3>
      </header>
      <div>{children}</div>
    </Reveal>
  )
}

/** Mission, vision, and values from the supplied "YNS MVV" document, set as a royal charter. */
function AboutStatements() {
  return (
    <RoyalFrame className="mt-16 px-6 py-16 sm:mt-24 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
      <Reveal className="text-center">
        <OrnamentDivider className="mx-auto max-w-sm" />
        <p className="mt-6 text-[11px] font-semibold tracking-[0.5em] text-gold-soft/80 uppercase">Mission · Vision · Values</p>
      </Reveal>

      <Chapter numeral={NUMERALS[0]} title="Mission">
        <p className={`text-lg leading-[1.85] text-pretty text-cream/80 sm:text-xl ${DROP_CAP}`}>{community.mission}</p>
      </Chapter>

      <OrnamentDivider />

      <Chapter numeral={NUMERALS[1]} title="Vision">
        <p className={`text-lg leading-[1.85] text-pretty text-cream/80 sm:text-xl ${DROP_CAP}`}>{community.vision}</p>
      </Chapter>

      <OrnamentDivider />

      <Chapter numeral={NUMERALS[2]} title="Values">
        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {community.coreValues.map((value, index) => (
            <li key={value} className="group border-t border-gold/25 pt-6 transition-colors duration-500 hover:border-gold/70">
              <span aria-hidden="true" className="inline-block font-serif text-2xl text-gold italic transition-transform duration-500 group-hover:-translate-y-0.5">{NUMERALS[index]}</span>
              <p className="mt-3 leading-relaxed text-pretty text-cream/80">{value}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Reveal className="mt-4 flex flex-col items-center gap-8">
        <OrnamentDivider className="w-full max-w-sm" />
        <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[0.2em] text-gold uppercase ring-1 ring-gold/40 transition-colors hover:bg-gold hover:text-ink">
          Ask us about it
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </Reveal>
    </RoyalFrame>
  )
}

export default AboutStatements

import { ArrowUpRight } from 'lucide-react'

import DraftNote from '@/components/common/draft-note'
import Reveal from '@/components/common/reveal'
import { aboutContent } from '@/constants/home-content'
import { community } from '@/data/community'

function StatementCard({ label, delay, className, children }) {
  return (
    <Reveal as="article" delay={delay} className={`rounded-3xl p-8 ${className}`}>
      <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-60">{label}</h3>
      <div className="mt-6 leading-relaxed">{children}</div>
    </Reveal>
  )
}

/** Mission, vision, and core values. Content is placeholder until approved. */
function AboutStatements() {
  return (
    <div className="mt-5">
      <div className="grid gap-5 lg:grid-cols-3">
        <StatementCard label="Mission" delay={0} className="bg-ink text-cream">
          <p className="text-lg text-cream/80">{community.mission}</p>
        </StatementCard>
        <StatementCard label="Vision" delay={100} className="bg-sand">
          <p className="text-lg text-ink/80">{community.vision}</p>
        </StatementCard>
        <StatementCard label="Core values" delay={200} className="bg-white ring-1 ring-ink/10">
          <ol className="grid gap-4">
            {community.coreValues.map((value, index) => (
              <li key={value} className="flex gap-4 text-ink/80">
                <span className="font-mono text-sm text-dawn" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {value}
              </li>
            ))}
          </ol>
        </StatementCard>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <DraftNote>{aboutContent.draftNote}</DraftNote>
        <a href="#contact" className="group inline-flex items-center gap-2 rounded-full font-semibold">
          Ask us about it
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default AboutStatements

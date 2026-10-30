import { UserRound } from 'lucide-react'

import Container from '@/components/common/container'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import { leadershipContent } from '@/constants/home-content'
import { leadershipPlaceholders } from '@/data/community'

function LeaderCard({ leader, index }) {
  return (
    <Reveal delay={index * 120} className="glow-border group flex items-start gap-6 rounded-[2rem] bg-white/[0.03] p-8 transition-colors duration-500 hover:bg-white/[0.06] sm:p-10">
      <div className="relative grid size-20 shrink-0 place-items-center" aria-hidden="true">
        <span className="halo-spin absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--ember),var(--dawn),var(--iris),var(--ember))] opacity-80" />
        <span className="absolute inset-[3px] rounded-full bg-ink" />
        <UserRound className="relative size-8 text-cream/70" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{leader.name}</h3>
        <p className="mt-3 leading-relaxed text-cream/60">{leader.description}</p>
      </div>
    </Reveal>
  )
}

function LeadershipSection() {
  return (
    <section id="leadership" aria-labelledby="leadership-heading" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-36">
      <Container>
        <SectionHeading id="leadership-heading" tone="light" eyebrow={leadershipContent.eyebrow} title={leadershipContent.title} accent={leadershipContent.accent} description={leadershipContent.description} />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {leadershipPlaceholders.map((leader, index) => (
            <LeaderCard key={leader.name} leader={leader} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default LeadershipSection

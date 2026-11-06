import Container from '@/components/common/container'
import DraftNote from '@/components/common/draft-note'
import LeaderCard from '@/components/common/leader-card'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import VerseCallout from '@/components/common/verse-callout'
import { Button } from '@/components/ui/button'
import { leadershipContent } from '@/constants/home-content'
import { leadershipDetails } from '@/constants/leadership-content'
import { leadershipPlaceholders } from '@/data/community'

/** `showHeading={false}` lets the standalone Leadership page supply its own hero heading. */
function LeadershipSection({ showHeading = true, leaders = leadershipPlaceholders, showDraftNote = true, status = 'ready', onRetry }) {
  return (
    <section id="leadership" aria-labelledby="core-officers-heading" className="relative overflow-clip bg-ink py-24 text-cream sm:py-32">
      <Container>
        {showHeading ? (
          <SectionHeading id="leadership-heading" tone="light" eyebrow={leadershipContent.eyebrow} title={leadershipContent.title} accent={leadershipContent.accent} description={leadershipContent.description} className="mb-16" />
        ) : null}
        <Reveal className="mb-10 max-w-2xl">
          <h2 id="core-officers-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">{leadershipDetails.title}</h2>
          <p className="mt-3 leading-relaxed text-cream/70">{leadershipDetails.introduction}</p>
          {showDraftNote ? <DraftNote tone="light" className="mt-5">{leadershipDetails.draftNote}</DraftNote> : null}
        </Reveal>
        {status === 'error' ? (
          <div role="alert" className="border-y border-cream/10 py-10">
            <p className="text-cream/70">{leadershipDetails.unavailable}</p>
            <Button onClick={onRetry} variant="secondary" className="mt-4 min-h-11">{leadershipDetails.retryLabel}</Button>
          </div>
        ) : status === 'loading' ? (
          <p role="status" className="border-y border-cream/10 py-10 text-cream/70">{leadershipDetails.loading}</p>
        ) : leaders.length ? (
          <ul aria-label="Core officers" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, index) => (
              <Reveal as="li" id={leader.previewId} key={leader.id ?? index} delay={Math.min(index, 2) * 100} className="min-w-0">
                <LeaderCard leader={leader} />
              </Reveal>
            ))}
          </ul>
        ) : <p role="status" className="border-y border-cream/10 py-10 text-cream/70">{leadershipDetails.empty}</p>}
        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center">
          <div className="max-w-md">
            <p className="text-2xl font-semibold tracking-tight">{leadershipDetails.invitation}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">{leadershipDetails.invitationDescription}</p>
          </div>
          <PillLink href="/gathering" variant="cream" className="max-w-full motion-reduce:transition-none">{leadershipDetails.gatheringLabel}</PillLink>
        </Reveal>
        <VerseCallout verseId="1-timothy-4-12" className="mt-20" />
      </Container>
    </section>
  )
}

export default LeadershipSection

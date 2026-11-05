import PageHero from '@/components/common/page-hero'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'

/** Inner-page empty state for unknown albums or locations. */
function NotFoundHero({ eyebrow, title, accent, description, actionHref, actionLabel }) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} accent={accent} description={description}>
        <Reveal delay={300} className="mt-12">
          <PillLink href={actionHref} variant="glow">
            {actionLabel}
          </PillLink>
        </Reveal>
      </PageHero>
    </main>
  )
}

export default NotFoundHero

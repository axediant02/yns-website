import OrnamentDivider from '@/components/common/ornament-divider'
import Reveal from '@/components/common/reveal'
import { getVerse, SCRIPTURE_VERSION } from '@/constants/scripture'
import { cn } from '@/lib/utils'

/** One verse, verbatim, set as a centered quotation with its reference and version. */
function VerseCallout({ verseId, tone = 'dark', className }) {
  const verse = getVerse(verseId)
  const isDark = tone === 'dark'

  return (
    <Reveal as="figure" className={cn('mx-auto max-w-3xl text-center', className)}>
      <OrnamentDivider className="mx-auto max-w-xs" />
      <blockquote className={cn('mt-8 font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] leading-relaxed text-balance whitespace-pre-line', isDark ? 'text-cream/90' : 'text-ink/85')}>
        <p>{verse.text}</p>
      </blockquote>
      <figcaption className={cn('mt-5 text-xs font-semibold tracking-[0.3em] uppercase', isDark ? 'text-gold' : 'text-ink/70')}>
        {verse.reference} <span aria-hidden="true">·</span> {SCRIPTURE_VERSION}
      </figcaption>
    </Reveal>
  )
}

export default VerseCallout

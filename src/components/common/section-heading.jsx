import Eyebrow from '@/components/common/eyebrow'
import Reveal from '@/components/common/reveal'
import { cn } from '@/lib/utils'

/**
 * Standard section heading: eyebrow, two-part title, and supporting copy.
 * `accent` renders on its own line with the gradient treatment.
 */
function SectionHeading({ id, eyebrow, title, accent, description, tone = 'dark', as: Heading = 'h2', className, children }) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end', className)}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Heading id={id} className="mt-6 text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-balance">
          {title}
          {accent ? <> <span className="text-dawn block pb-1">{accent}</span></> : null}
        </Heading>
      </Reveal>
      {description || children ? (
        <Reveal delay={120} className="max-w-md lg:justify-self-end">
          {description ? (
            <p className={cn('text-lg leading-relaxed text-pretty', tone === 'light' ? 'text-cream/70' : 'text-muted-foreground')}>{description}</p>
          ) : null}
          {children}
        </Reveal>
      ) : null}
    </div>
  )
}

export default SectionHeading

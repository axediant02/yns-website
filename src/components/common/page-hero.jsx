import { ArrowLeft } from 'lucide-react'

import AuroraBackdrop from '@/components/common/aurora-backdrop'
import Container from '@/components/common/container'
import Eyebrow from '@/components/common/eyebrow'
import SplitText from '@/components/common/split-text'
import usePointerSpotlight from '@/hooks/use-pointer-spotlight'

/**
 * Dark hero used by inner pages: back link, eyebrow, h1, and supporting copy.
 * Plays its entrance whenever the page mounts, on load or after a page switch.
 */
function PageHero({ backHref, backLabel, eyebrow, title, accent, description, children }) {
  const spotlightRef = usePointerSpotlight()
  const accentStart = title.split(' ').length

  return (
    <section ref={spotlightRef} className="relative isolate overflow-hidden bg-ink pt-36 pb-20 text-cream sm:pt-44 sm:pb-28">
      <AuroraBackdrop className="enter-bloom" />
      <Container className="scroll-hero-exit relative">
        {backHref ? (
          <div className="enter-fade" style={{ '--enter-delay': '100ms' }}>
            <a href={backHref} className="group inline-flex items-center gap-2 rounded-full text-sm text-cream/70 transition-colors hover:text-cream">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {backLabel}
            </a>
          </div>
        ) : null}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="enter-fade" style={{ '--enter-delay': '180ms' }}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-6 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-balance">
              <SplitText text={title} delay={260} className="split-on-mount" />
              {accent ? (
                <>
                  {' '}
                  <SplitText text={accent} startIndex={accentStart} delay={260} className="split-on-mount block pb-2" wordClassName="text-dawn" />
                </>
              ) : null}
            </h1>
          </div>
          {description ? (
            <p className="enter-fade max-w-md text-lg leading-relaxed text-cream/70" style={{ '--enter-delay': '600ms' }}>
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  )
}

export default PageHero

import { ArrowLeft } from 'lucide-react'

import AuroraBackdrop from '@/components/common/aurora-backdrop'
import Container from '@/components/common/container'
import Eyebrow from '@/components/common/eyebrow'
import Reveal from '@/components/common/reveal'
import usePointerSpotlight from '@/hooks/use-pointer-spotlight'

/** Dark hero used by inner pages: back link, eyebrow, h1, and supporting copy. */
function PageHero({ backHref, backLabel, eyebrow, title, accent, description, children }) {
  const spotlightRef = usePointerSpotlight()

  return (
    <section ref={spotlightRef} className="relative isolate overflow-hidden bg-ink pt-36 pb-20 text-cream sm:pt-44 sm:pb-28">
      <AuroraBackdrop />
      <Container className="relative">
        {backHref ? (
          <Reveal>
            <a href={backHref} className="group inline-flex items-center gap-2 rounded-full text-sm text-cream/70 transition-colors hover:text-cream">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {backLabel}
            </a>
          </Reveal>
        ) : null}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal delay={80}>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-balance">
              {title}
              {accent ? <> <span className="text-dawn block pb-2">{accent}</span></> : null}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={200}>
              <p className="max-w-md text-lg leading-relaxed text-cream/70">{description}</p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  )
}

export default PageHero

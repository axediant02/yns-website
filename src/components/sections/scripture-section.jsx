import Container from '@/components/common/container'
import SectionHeading from '@/components/common/section-heading'
import ScriptureSpotlight from '@/components/sections/scripture-spotlight'
import { scriptureContent } from '@/constants/scripture'

/** Youth and fellowship verses (NLT) on a parchment backdrop. */
function ScriptureSection() {
  return (
    <section id="scripture" aria-labelledby="scripture-heading" className="relative overflow-clip bg-sand py-24 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          id="scripture-heading"
          eyebrow={scriptureContent.eyebrow}
          title={scriptureContent.title}
          accent={scriptureContent.accent}
          description={scriptureContent.description}
        />
        <ScriptureSpotlight />
      </Container>
    </section>
  )
}

export default ScriptureSection

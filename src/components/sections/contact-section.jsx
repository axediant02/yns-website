import { ArrowUpRight, Link2, MessageCircle } from 'lucide-react'

import AuroraBackdrop from '@/components/common/aurora-backdrop'
import Container from '@/components/common/container'
import Eyebrow from '@/components/common/eyebrow'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import { Button } from '@/components/ui/button'
import { contactContent } from '@/constants/home-content'
import { community } from '@/data/community'
import usePointerSpotlight from '@/hooks/use-pointer-spotlight'

function ContactAction() {
  if (community.contact.href) {
    return (
      <PillLink href={community.contact.href} target="_blank" rel="noreferrer" variant="glow" icon={ArrowUpRight} className="h-14 px-8 text-base">
        <MessageCircle className="size-5" aria-hidden="true" />
        Message us on {community.contact.label}
      </PillLink>
    )
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button disabled size="lg" className="h-14 gap-2 rounded-full bg-cream px-8 text-base font-semibold text-ink disabled:opacity-75">
        <MessageCircle className="size-5" aria-hidden="true" />
        Contact link coming soon
      </Button>
      <p className="inline-flex items-center gap-2 text-sm text-cream/60">
        <Link2 className="size-4" aria-hidden="true" />
        {contactContent.pendingStatus}
      </p>
    </div>
  )
}

function ContactSection() {
  const spotlightRef = usePointerSpotlight()

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-cream py-16 sm:py-24">
      <Container>
        <Reveal>
          <div ref={spotlightRef} className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-6 py-20 text-cream sm:px-14 sm:py-28">
            <AuroraBackdrop showHalo haloClassName="top-0 left-[85%] opacity-70" />
            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <Eyebrow tone="light">{contactContent.eyebrow}</Eyebrow>
                <h2 id="contact-heading" className="mt-6 text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
                  {contactContent.title}
                  {' '}
                  <span className="text-dawn block pb-2">{contactContent.accent}</span>
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-cream/70">{contactContent.description}</p>
                <div className="mt-8">
                  <ContactAction />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default ContactSection

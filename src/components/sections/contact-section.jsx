import { ArrowUpRight, Link2, MessageCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { community } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function ContactSection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="contact" className={`contact-section section-frame section-coral reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame contact-grid">
        <div>
          <Badge className="eyebrow-badge eyebrow-dark">Contact</Badge>
          <h2>Questions are<br /><em>welcome here.</em></h2>
        </div>
        <div className="contact-copy">
          <p>Want to know more before Sunday? Need directions when the venue is confirmed? We would love to hear from you.</p>
          <Button disabled={!community.contact.href} size="lg" className="contact-button">
            <MessageCircle aria-hidden="true" />
            {community.contact.href ? 'Message us' : 'Contact link coming soon'}
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <span className="contact-status"><Link2 aria-hidden="true" /> Contact link will be added soon.</span>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

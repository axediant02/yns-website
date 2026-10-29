import { ArrowUpRight, Link2, MessageCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { community } from '@/data/community'
import { contactCopy } from '@/data/section-copy'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function ContactSection({ content = contactCopy, contact = community.contact }) {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="contact" className={`contact-section section-frame section-coral reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame contact-grid">
        <div>
          <Badge className="eyebrow-badge eyebrow-dark">Contact</Badge>
          <h2>{content.heading}<br /><em>{content.emphasis}</em></h2>
        </div>
        <div className="contact-copy">
          <p>{content.description}</p>
          <Button asChild={Boolean(contact.href)} disabled={!contact.href} size="lg" className="contact-button">
            {contact.href ? <a href={contact.href} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" />{contact.label}<ArrowUpRight aria-hidden="true" /></a> : <>
            <MessageCircle aria-hidden="true" />
            Contact link coming soon
            <ArrowUpRight aria-hidden="true" />
            </>}
          </Button>
          <span className="contact-status"><Link2 aria-hidden="true" /> {contact.href ? contact.label : 'Contact link will be added soon.'}</span>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

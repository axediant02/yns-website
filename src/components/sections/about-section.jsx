import { ArrowUpRight, HeartHandshake, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { community } from '@/data/community'
import { aboutCopy } from '@/data/section-copy'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function AboutSection({ content = aboutCopy, identity = community }) {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="about" className={`about-section section-frame section-dark reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-wide">
          <Badge className="eyebrow-badge eyebrow-light">About</Badge>
          <h2>{content.heading}<br /><em>{content.emphasis}</em></h2>
          <p>
            {content.description}
          </p>
        </div>

        <div className="about-pillars">
          <div className="about-pillar">
            <span className="pillar-icon"><HeartHandshake aria-hidden="true" /></span>
            <span className="pillar-number">01</span>
            <h3>{content.pillarOneTitle}</h3>
            <p>{content.pillarOneBody}</p>
          </div>
          <Separator orientation="vertical" className="about-separator" />
          <div className="about-pillar">
            <span className="pillar-icon"><Sparkles aria-hidden="true" /></span>
            <span className="pillar-number">02</span>
            <h3>{content.pillarTwoTitle}</h3>
            <p>{content.pillarTwoBody}</p>
          </div>
        </div>

        <div className="about-statements">
          <article className="about-statement">
            <span className="footer-label">Mission</span>
            <p>{identity.mission}</p>
          </article>
          <article className="about-statement">
            <span className="footer-label">Vision</span>
            <p>{identity.vision}</p>
          </article>
          <article className="about-statement">
            <span className="footer-label">Core values</span>
            <ul>
              {identity.coreValues.map((value, index) => <li key={index}>{value}</li>)}
            </ul>
          </article>
        </div>

        <a className="about-statements-link" href="#contact">Ask us about it <ArrowUpRight aria-hidden="true" /></a>

        <div className="about-marquee" aria-hidden="true">
          <span>{identity.shortName}</span><span>—</span><span>TOLEDO CITY</span><span>—</span><span>CEBU</span><span>—</span>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

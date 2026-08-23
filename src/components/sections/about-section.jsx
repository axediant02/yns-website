import { ArrowUpRight, HeartHandshake, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { community } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function AboutSection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="about" className={`about-section section-frame section-dark reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-wide">
          <Badge className="eyebrow-badge eyebrow-light">01 / The why</Badge>
          <h2>There is room<br /><em>for you here.</em></h2>
          <p>
            You do not need to have everything figured out before you show up. YNS D6 is a place to ask honest questions, meet people, and take the next step together.
          </p>
        </div>

        <div className="about-pillars">
          <div className="about-pillar">
            <span className="pillar-icon"><HeartHandshake aria-hidden="true" /></span>
            <span className="pillar-number">01</span>
            <h3>Come as you are</h3>
            <p>Everyone interested is welcome. Start with a conversation, a Sunday, or simply a question.</p>
          </div>
          <Separator orientation="vertical" className="about-separator" />
          <div className="about-pillar">
            <span className="pillar-icon"><Sparkles aria-hidden="true" /></span>
            <span className="pillar-number">02</span>
            <h3>Grow with others</h3>
            <p>Faith is not a solo project. We are learning to follow Jesus with courage, honesty, and joy.</p>
          </div>
        </div>

        <div className="about-statements">
          <article className="about-statement">
            <span className="footer-label">Mission</span>
            <p>{community.mission}</p>
          </article>
          <article className="about-statement">
            <span className="footer-label">Vision</span>
            <p>{community.vision}</p>
          </article>
          <article className="about-statement">
            <span className="footer-label">Core values</span>
            <ul>
              {community.coreValues.map((value) => <li key={value}>{value}</li>)}
            </ul>
          </article>
        </div>

        <a className="about-statements-link" href="#contact">Ask us about it <ArrowUpRight aria-hidden="true" /></a>

        <div className="about-marquee" aria-hidden="true">
          <span>{community.shortName}</span><span>—</span><span>TOLEDO CITY</span><span>—</span><span>CEBU</span><span>—</span>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

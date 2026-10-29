import { ArrowDownRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { community } from '@/data/community'
import { heroCopy } from '@/data/section-copy'

function HeroSection({ content = heroCopy, gathering = community.gathering, location = community.location }) {
  return (
    <section id="top" className="hero-section section-frame">
      <div className="hero-grid page-frame">
        <div className="hero-copy">
          <Badge className="eyebrow-badge">{content.badge}</Badge>
          <h1>{content.heading}<br /><em>{content.emphasis}</em></h1>
          <p className="hero-description">
            {content.description}
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-action">
              <a href={content.primaryHref}>{content.primaryLabel} <ArrowUpRight aria-hidden="true" /></a>
            </Button>
            <a className="text-action" href={content.secondaryHref}>
              {content.secondaryLabel} <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-details" aria-label="Gathering details">
            <span><CalendarDays aria-hidden="true" /> {gathering.day}</span>
            <span><MapPin aria-hidden="true" /> {location}</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-kicker">WE ARE<br />BETTER<br /><span>TOGETHER</span></div>
          <div className="hero-art-circle hero-art-circle-one" />
          <div className="hero-art-circle hero-art-circle-two" />
          <div className="hero-art-block">
            <span>YNS</span>
            <strong>D6</strong>
          </div>
        </div>
      </div>
      <div className="hero-scroll page-frame">
        <span>Scroll to explore</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  )
}

export default HeroSection

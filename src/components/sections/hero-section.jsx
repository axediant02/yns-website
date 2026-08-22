import { ArrowDownRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { community } from '@/data/community'

function HeroSection() {
  return (
    <section id="top" className="hero-section section-frame">
      <div className="hero-grid page-frame">
        <div className="hero-copy">
          <Badge className="eyebrow-badge">A community in Toledo City</Badge>
          <h1>Find your people.<br /><em>Follow Jesus.</em></h1>
          <p className="hero-description">
            YNS D6 is a growing community for everyone interested in discovering what it looks like to follow Jesus together.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-action">
              <a href="#gathering">Join us this Sunday <ArrowUpRight aria-hidden="true" /></a>
            </Button>
            <a className="text-action" href="#about">
              Get to know us <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-details" aria-label="Gathering details">
            <span><CalendarDays aria-hidden="true" /> {community.gathering.day}</span>
            <span><MapPin aria-hidden="true" /> {community.location}</span>
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
          <div className="hero-art-caption">A place to belong<br />before you believe.</div>
        </div>
      </div>
      <div className="hero-scroll page-frame">
        <span>Scroll to explore</span>
        <span className="hero-scroll-line" />
        <span>01—06</span>
      </div>
    </section>
  )
}

export default HeroSection

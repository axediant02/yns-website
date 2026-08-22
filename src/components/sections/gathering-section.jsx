import { ArrowUpRight, CalendarDays, Clock3, MapPin, UsersRound } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { community } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function GatheringSection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="gathering" className={`gathering-section section-frame reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-split">
          <div>
            <Badge className="eyebrow-badge">02 / Make a plan</Badge>
            <h2>Start with<br /><em>Sunday.</em></h2>
          </div>
          <p>Come for the gathering. Stay for the people, the questions, and the possibility of a life shaped by Jesus.</p>
        </div>

        <Card className="gathering-card">
          <CardHeader className="gathering-card-top">
            <div className="gathering-date-mark">
              <span>SUN</span>
              <strong>01</strong>
            </div>
            <div>
              <Badge variant="outline">Weekly gathering</Badge>
              <h3>Everyone is invited.</h3>
            </div>
            <span className="gathering-card-arrow"><ArrowUpRight aria-hidden="true" /></span>
          </CardHeader>
          <CardContent className="gathering-card-content">
            <div className="gathering-fact">
              <CalendarDays aria-hidden="true" />
              <span><small>When</small><strong>{community.gathering.day}</strong></span>
            </div>
            <div className="gathering-fact">
              <Clock3 aria-hidden="true" />
              <span><small>Time</small><strong>{community.gathering.time}</strong></span>
            </div>
            <div className="gathering-fact">
              <MapPin aria-hidden="true" />
              <span><small>Where</small><strong>{community.gathering.venue}</strong></span>
            </div>
            <div className="gathering-fact">
              <UsersRound aria-hidden="true" />
              <span><small>Who</small><strong>{community.audience}</strong></span>
            </div>
          </CardContent>
          <div className="gathering-card-footer">
            <span>Not sure what to expect? That is okay.</span>
            <Button asChild variant="secondary">
              <a href="#contact">Ask a question <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </Card>

        <div className="gathering-note">
          <span>FIRST TIME?</span>
          <p>Look for a friendly face, introduce yourself, and let us know it is your first Sunday. We will help you find your way.</p>
        </div>
      </div>
    </section>
  )
}

export default GatheringSection

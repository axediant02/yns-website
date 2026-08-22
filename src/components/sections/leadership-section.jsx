import { ArrowUpRight, UserRound } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { leadershipPlaceholders } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function LeadershipSection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="leadership" className={`leadership-section section-frame section-dark reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-split">
          <div>
            <Badge className="eyebrow-badge eyebrow-light">04 / The team</Badge>
            <h2>People who<br /><em>make space.</em></h2>
          </div>
          <p>YNS D6 is shaped by people who care about making a welcoming place to meet Jesus and one another. Our team details are coming soon.</p>
        </div>

        <div className="leadership-grid">
          {leadershipPlaceholders.map((leader) => (
            <Card key={leader.name} className="leader-card">
              <CardContent>
                <div className="leader-avatar"><UserRound aria-hidden="true" /></div>
                <span className="footer-label">{leader.role}</span>
                <h3>{leader.name}</h3>
                <p>{leader.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <a className="section-text-link" href="#contact">Want to help build this? <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}

export default LeadershipSection

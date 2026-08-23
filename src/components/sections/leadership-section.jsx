import { UserRound } from 'lucide-react'

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
            <Badge className="eyebrow-badge eyebrow-light">Leadership</Badge>
            <h2>People who<br /><em>make space.</em></h2>
          </div>
          <p>YNS D6 is shaped by people who care about making a welcoming place to meet Jesus and one another. Leadership details will be added as they are confirmed.</p>
        </div>

        <div className="leadership-grid">
          {leadershipPlaceholders.map((leader) => (
            <Card key={leader.name} className="leader-card">
              <CardContent>
                <div className="leader-avatar"><UserRound aria-hidden="true" /></div>
                <h3>{leader.name}</h3>
                <p>{leader.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LeadershipSection

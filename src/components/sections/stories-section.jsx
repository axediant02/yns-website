import { ArrowUpRight, Quote } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { storyPlaceholders } from '@/data/community'
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'

function StoriesSection() {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section ref={elementRef} id="stories" className={`stories-section section-frame section-acid reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <div className="page-frame">
        <div className="section-heading section-heading-split">
          <div>
            <Badge className="eyebrow-badge eyebrow-dark">Stories</Badge>
            <h2>Every story<br /><em>starts somewhere.</em></h2>
          </div>
          <p>The best way to understand YNS D6 is to hear from the people who are finding their way through faith, friendship, and everyday life.</p>
        </div>

        <div className="story-grid">
          {storyPlaceholders.map((story) => (
            <Card key={story.accent} className="story-card">
              <CardContent>
                <div className="story-card-top">
                  <span className="story-accent">{story.accent}</span>
                  <Quote aria-hidden="true" />
                </div>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <a className="story-link" href="#contact">Start a conversation <ArrowUpRight aria-hidden="true" /></a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoriesSection

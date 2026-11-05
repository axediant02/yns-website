import { ArrowUpRight, Quote } from 'lucide-react'

import Container from '@/components/common/container'
import Reveal from '@/components/common/reveal'
import SectionHeading from '@/components/common/section-heading'
import { storiesContent } from '@/constants/home-content'
import { storyPlaceholders } from '@/data/community'
import { cn } from '@/lib/utils'

function StoryCard({ story, index }) {
  return (
    <Reveal
      as="article"
      delay={index * 140}
      className={cn(
        'group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-12',
        index % 2 === 0 ? 'bg-ink text-cream' : 'bg-white ring-1 ring-ink/10 md:mt-24',
      )}
    >
      <div aria-hidden="true" className="absolute -right-10 -bottom-16 text-[16rem] leading-none font-semibold tracking-[-0.08em] opacity-[0.06] transition-transform duration-700 group-hover:-translate-y-4">
        {story.accent}
      </div>
      <div className="relative flex items-center justify-between">
        <Quote className={cn('size-10', index % 2 === 0 ? 'text-ember' : 'text-dawn')} aria-hidden="true" />
        <span className="font-mono text-sm opacity-50" aria-hidden="true">{story.accent}</span>
      </div>
      <div className="relative mt-16">
        <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">{story.title}</h3>
        <p className="mt-5 max-w-md leading-relaxed opacity-70">{story.description}</p>
        <a href="#contact" className="group/link mt-8 inline-flex items-center gap-2 rounded-full font-semibold">
          Start a conversation
          <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </Reveal>
  )
}

function StoriesSection() {
  return (
    <section id="stories" aria-labelledby="stories-heading" className="relative overflow-hidden bg-sand py-24 sm:py-36">
      <div aria-hidden="true" className="absolute top-0 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-linear-to-r from-ember/20 via-dawn/15 to-iris/20 blur-3xl" />
      <Container className="relative">
        <SectionHeading id="stories-heading" eyebrow={storiesContent.eyebrow} title={storiesContent.title} accent={storiesContent.accent} description={storiesContent.description} />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {storyPlaceholders.map((story, index) => (
            <StoryCard key={story.accent} story={story} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default StoriesSection

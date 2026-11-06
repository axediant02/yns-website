import AboutSection from '@/components/sections/about-section'
import ContactSection from '@/components/sections/contact-section'
import EventsSection from '@/components/sections/events-section'
import GallerySection from '@/components/sections/gallery-section'
import GatheringSection from '@/components/sections/gathering-section'
import HeroSection from '@/components/sections/hero-section'
import LeadershipSection from '@/components/sections/leadership-section'
import PublishedLeadership from '@/features/leadership/published-leadership'
import ScriptureSection from '@/components/sections/scripture-section'
import StoriesSection from '@/components/sections/stories-section'

function HomePage({ isReady, sections = {} }) {
  return (
    <main>
      <HeroSection isReady={isReady} />
      <AboutSection />
      <ScriptureSection />
      <GatheringSection />
      <EventsSection />
      <GallerySection />
      <StoriesSection />
      {sections.leadership ? <LeadershipSection {...sections.leadership} /> : <PublishedLeadership />}
      <ContactSection />
    </main>
  )
}

export default HomePage

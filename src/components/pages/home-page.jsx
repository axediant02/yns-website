import AboutSection from '@/components/sections/about-section'
import ContactSection from '@/components/sections/contact-section'
import GallerySection from '@/components/sections/gallery-section'
import GatheringSection from '@/components/sections/gathering-section'
import HeroSection from '@/components/sections/hero-section'
import LeadershipSection from '@/components/sections/leadership-section'
import StoriesSection from '@/components/sections/stories-section'

function HomePage({ isReady }) {
  return (
    <main>
      <HeroSection isReady={isReady} />
      <AboutSection />
      <GatheringSection />
      <GallerySection />
      <StoriesSection />
      <LeadershipSection />
      <ContactSection />
    </main>
  )
}

export default HomePage

import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import GatheringSection from '@/components/sections/gathering-section'
import GallerySection from '@/components/sections/gallery-section'
import StoriesSection from '@/components/sections/stories-section'
import LeadershipSection from '@/components/sections/leadership-section'
import ContactSection from '@/components/sections/contact-section'

export default function HomePage({ sections = {} }) {
  return <main>
    <HeroSection {...sections.hero} />
    <AboutSection {...sections.about} />
    <GatheringSection {...sections.gathering} />
    <GallerySection {...sections.gallery} />
    <StoriesSection {...sections.stories} />
    <LeadershipSection {...sections.leadership} />
    <ContactSection {...sections.contact} />
  </main>
}

import PageHero from '@/components/common/page-hero'
import AboutSection from '@/components/sections/about-section'
import ContactSection from '@/components/sections/contact-section'
import GatheringSection from '@/components/sections/gathering-section'
import PublishedLeadership from '@/features/leadership/published-leadership'
import StoriesSection from '@/components/sections/stories-section'
import { aboutContent, contactContent, gatheringContent, leadershipContent, storiesContent } from '@/constants/home-content'

const sectionPages = {
  about: { content: aboutContent, Section: AboutSection },
  gathering: { content: gatheringContent, Section: GatheringSection },
  stories: { content: storiesContent, Section: StoriesSection },
  leadership: { content: leadershipContent, Section: PublishedLeadership },
  contact: { content: contactContent, Section: ContactSection },
}

/** Standalone page for a homepage section: shared hero heading, then the section body. */
function SectionPage({ type }) {
  const { content, Section } = sectionPages[type]

  return (
    <main id={`${type}-top`}>
      <PageHero
        backHref="/"
        backLabel="Back to home"
        eyebrow={content.eyebrow}
        title={content.title}
        accent={content.accent}
        description={content.description}
      />
      <Section showHeading={false} />
    </main>
  )
}

export default SectionPage

import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import GatheringSection from '@/components/sections/gathering-section'
import ContactSection from '@/components/sections/contact-section'
import StoriesSection from '@/components/sections/stories-section'
import LeadershipSection from '@/components/sections/leadership-section'
import LocationPage from '@/components/pages/location-page'
import EventsPage from '@/components/pages/events-page'
import { GalleryEventView } from '@/components/pages/gallery-page'
import { community } from '@/data/community'
import { readPhotos } from './preview-validation'

export default function PreviewRenderer({ draft }) {
  const { moduleId, values } = draft
  switch (moduleId) {
    case 'hero': return <HeroSection content={values} gathering={{ day: values.day }} location={values.location} />
    case 'about': return <AboutSection content={values} identity={{ ...community, ...values, coreValues: values.coreValues.split('\n').filter(Boolean) }} />
    case 'gathering': return <GatheringSection content={values} gathering={values} audience={values.audience} />
    case 'contact': return <ContactSection content={values} contact={values} />
    case 'story': return <StoriesSection stories={[values]} />
    case 'leader': return <LeadershipSection leaders={[values]} />
    case 'location': return <LocationPage content={{ ...values, id: values.locationId, contact: { href: values.contactHref }, image: { src: values.imageSrc, alt: values.imageAlt } }} />
    case 'album': return <GalleryEventView key={JSON.stringify(values)} event={{ ...values, photos: readPhotos(values.photos) ?? [] }} />
    case 'event': return <EventsPage events={[values]} />
    default: return null
  }
}

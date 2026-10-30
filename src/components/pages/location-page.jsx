import { ChevronsDown } from 'lucide-react'

import DraftNote from '@/components/common/draft-note'
import NotFoundHero from '@/components/common/not-found-hero'
import PageHero from '@/components/common/page-hero'
import Reveal from '@/components/common/reveal'
import LocationDetails from '@/components/sections/location-details'
import LocationEventsSection from '@/components/sections/location-events-section'
import LocationExpectations from '@/components/sections/location-expectations'
import LocationPhotoTimeline from '@/components/sections/location-photo-timeline'
import { getLocationBySlug } from '@/lib/location-routes'

function LocationPage({ slug }) {
  const location = getLocationBySlug(slug)

  if (!location) {
    return (
      <NotFoundHero
        eyebrow="Location"
        title="We could not find"
        accent="that place."
        description="Choose one of our listed locations to find gathering details and directions."
        actionHref="/#gathering"
        actionLabel="See all locations"
      />
    )
  }

  return (
    <main id="location-top">
      <PageHero backHref="/" backLabel="Back to home" eyebrow="Your local gathering" title={location.name} accent={`${location.area.split(',')[0]}.`}>
        <Reveal delay={260} className="mt-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-cream/75">
              {location.welcomeMessage || 'Local welcome message coming soon. Everyone interested is welcome to learn more and ask questions.'}
            </p>
            {!location.welcomeMessage ? <DraftNote tone="light" className="mt-4">Draft location copy</DraftNote> : null}
          </div>
          <a href="#location-content" className="group inline-flex items-center gap-2 rounded-full text-sm text-cream/60 transition-colors hover:text-cream">
            Scroll to gathering details
            <ChevronsDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </PageHero>

      <LocationDetails location={location} />
      <LocationEventsSection location={location} />
      <LocationPhotoTimeline location={location} />
      <LocationExpectations location={location} />
    </main>
  )
}

export default LocationPage

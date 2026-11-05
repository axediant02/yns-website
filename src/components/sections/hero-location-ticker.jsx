import { Sparkle } from 'lucide-react'

import Marquee from '@/components/common/marquee'
import { locations } from '@/data/community'

/** Ticker of gathering locations along the bottom of the hero. */
function HeroLocationTicker() {
  return (
    <div className="border-t border-white/10 py-5">
      <p className="sr-only">Gathering locations: {locations.map((location) => location.name).join(', ')}.</p>
      <div aria-hidden="true">
        <Marquee
          items={locations}
          duration={45}
          renderItem={(location) => (
            <span className="flex items-center gap-6 px-6 text-2xl font-semibold tracking-tight text-cream/80 sm:text-3xl">
              {location.name}
              <span className="text-sm font-normal tracking-normal text-cream/40">{location.area}</span>
              <Sparkle className="size-4 text-ember" />
            </span>
          )}
        />
      </div>
    </div>
  )
}

export default HeroLocationTicker

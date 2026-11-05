import { useState } from 'react'
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'

import ClientLink from '@/components/common/client-link'
import PillLink from '@/components/common/pill-link'
import Reveal from '@/components/common/reveal'
import { community, locations } from '@/data/community'
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl, getLocationHref } from '@/lib/location-routes'
import { cn } from '@/lib/utils'

function LocationOption({ location, index, isSelected, onSelect }) {
  const handleClick = (event) => {
    onSelect(location.id)
    // Keep the chosen chip visible in the horizontal mobile list.
    event.currentTarget.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={handleClick}
      className={cn(
        'group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left whitespace-nowrap transition-all duration-300 lg:whitespace-normal',
        isSelected ? 'bg-cream text-ink shadow-lg' : 'text-cream/80 hover:bg-white/[0.06] hover:text-cream',
      )}
    >
      <span className={cn('font-mono text-xs', isSelected ? 'text-dawn' : 'text-cream/40')} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex-1">
        <span className="block font-semibold">{location.name}</span>
        <span className={cn('block text-sm', isSelected ? 'text-ink/60' : 'text-cream/50')}>{location.area}</span>
      </span>
      <ArrowRight className={cn('hidden size-4 transition-all duration-300 lg:block', isSelected ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60')} aria-hidden="true" />
    </button>
  )
}

/** Location list with a single shared map preview for the selected location. */
function LocationExplorer() {
  const [selectedId, setSelectedId] = useState(locations[0].id)
  const selected = locations.find((location) => location.id === selectedId)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <Reveal className="rounded-3xl bg-white/[0.03] p-2 ring-1 ring-white/10">
        <ul className="flex snap-x gap-1 overflow-x-auto lg:grid lg:overflow-visible" aria-label="Gathering locations">
          {locations.map((location, index) => (
            <li key={location.id} className="shrink-0 snap-start lg:shrink">
              <LocationOption location={location} index={index} isSelected={location.id === selectedId} onSelect={setSelectedId} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className="relative min-h-[28rem] overflow-hidden rounded-3xl bg-ink-soft ring-1 ring-white/10">
        <iframe
          key={selected.id}
          title={`Map showing ${selected.name}, ${selected.area}`}
          src={getGoogleMapsEmbedUrl(selected.mapQuery)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full animate-in grayscale-[35%] duration-700 fade-in"
        />
        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/85 p-5 text-cream ring-1 ring-white/10 backdrop-blur-xl sm:inset-x-4 sm:bottom-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-ember uppercase">
                <MapPin className="size-3.5" aria-hidden="true" />
                {community.gathering.day} · {community.gathering.time}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{selected.name}</p>
              <p className="text-sm text-cream/60">{selected.area}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PillLink as={ClientLink} href={getLocationHref(selected)} variant="cream" className="h-10 px-4">
                View {selected.name}
              </PillLink>
              <PillLink href={getGoogleMapsUrl(selected.mapQuery)} target="_blank" rel="noreferrer" variant="ghostLight" icon={ExternalLink} className="h-10 px-4">
                Directions
                <span className="sr-only"> to {selected.name} (opens in a new tab)</span>
              </PillLink>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export default LocationExplorer

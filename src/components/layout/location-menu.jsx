import { useState } from 'react'
import { Check, ChevronDown, MapPin } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { locations } from '@/data/community'
import { getLocationHref } from '@/lib/location-routes'
import { navigateTo } from '@/lib/site-route'

/** Desktop dropdown for jumping to a location page. */
function LocationMenu({ activeLocation }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (event, location) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return

    event.preventDefault()
    setIsOpen(false)
    navigateTo(getLocationHref(location))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-cream/80 transition-colors outline-none hover:bg-white/10 hover:text-cream focus-visible:ring-2 focus-visible:ring-ember data-[state=open]:bg-white/10 data-[state=open]:text-cream">
        <MapPin className="size-4 text-ember" aria-hidden="true" />
        {activeLocation ? activeLocation.name : 'Locations'}
        <ChevronDown className="size-3.5 transition-transform duration-300 in-data-[state=open]:rotate-180" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-80 rounded-2xl border-0 bg-ink-soft/95 p-2 text-cream shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
      >
        <DropdownMenuLabel className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-[0.18em] text-cream/50 uppercase">
          Choose a location
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {locations.map((location) => {
          const isActive = activeLocation?.id === location.id

          return (
            <DropdownMenuItem key={location.id} asChild className="cursor-pointer rounded-xl px-3 py-2.5 focus:bg-white/10 focus:text-cream">
              <a href={getLocationHref(location)} onClick={(event) => handleSelect(event, location)} aria-current={isActive ? 'page' : undefined}>
                <span className="flex-1">
                  <span className={isActive ? 'block font-semibold text-ember' : 'block font-semibold'}>{location.name}</span>
                  <span className="block text-xs text-cream/50">{location.area}</span>
                </span>
                {isActive ? <Check className="size-4 text-ember" aria-hidden="true" /> : null}
              </a>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocationMenu

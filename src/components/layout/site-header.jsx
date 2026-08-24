import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronDown, MapPin, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navigationItems, community, locations } from '@/data/community'
import { getLocationBySlug, getLocationHref, getLocationRoute, getSiteHref } from '@/lib/location-routes'

function LocationMenu({ activeLocation, closeMenu, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLocationSelect = (event, location) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    setIsOpen(false)
    window.history.pushState({}, '', getLocationHref(location))
    window.dispatchEvent(new PopStateEvent('popstate'))
    closeMenu()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button type="button" className={`location-menu-trigger ${mobile ? 'location-menu-trigger-mobile' : ''}`}>
          <MapPin aria-hidden="true" />
          <span>{activeLocation ? activeLocation.name : 'Locations'}</span>
          <ChevronDown aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? 'start' : 'end'} className="location-menu-content">
        <DropdownMenuLabel>Choose a location</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locations.map((location) => (
          <DropdownMenuItem key={location.id} asChild>
            <a className={activeLocation?.id === location.id ? 'location-menu-item-active' : ''} href={getLocationHref(location)} onClick={(event) => handleLocationSelect(event, location)}>
              <span>
                <strong>{location.name}</strong>
                <small>{location.area}</small>
              </span>
              {activeLocation?.id === location.id ? <span className="location-menu-current">Current</span> : null}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLocation, setActiveLocation] = useState(() => {
    const route = getLocationRoute(window.location.pathname)
    return route ? getLocationBySlug(route.slug) : null
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const route = getLocationRoute(window.location.pathname)
      setActiveLocation(route ? getLocationBySlug(route.slug) : null)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="page-frame header-inner">
        <a className="brand-lockup" href="#top" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">D6</span>
          <span>
            <span className="brand-name">YNS D6</span>
            <span className="brand-location">{community.location}</span>
          </span>
        </a>

        <nav className={`desktop-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a key={item.href} href={getSiteHref(item.href)} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <LocationMenu activeLocation={activeLocation} closeMenu={closeMenu} />
          <Button asChild size="sm" className="header-cta">
            <a href="#gathering" onClick={closeMenu}>
              Join us <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </nav>

        <Button
          className="mobile-menu-toggle"
          variant="outline"
          size="icon"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      <nav id="mobile-navigation" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
        <div className="page-frame mobile-nav-inner">
          {navigationItems.map((item) => (
            <a key={item.href} href={getSiteHref(item.href)} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <LocationMenu activeLocation={activeLocation} closeMenu={closeMenu} mobile />
          <a className="mobile-nav-cta" href="/#gathering" onClick={closeMenu}>
            Join us this Sunday <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader

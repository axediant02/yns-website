import { useCallback, useState } from 'react'
import { Menu, X } from 'lucide-react'

import BrandLockup from '@/components/common/brand-lockup'
import Container from '@/components/common/container'
import PillLink from '@/components/common/pill-link'
import LocationMenu from '@/components/layout/location-menu'
import MobileMenu from '@/components/layout/mobile-menu'
import { Button } from '@/components/ui/button'
import { navigationItems } from '@/data/community'
import useActiveSection from '@/hooks/use-active-section'
import useScrollState from '@/hooks/use-scroll-state'
import { getLocationBySlug, getSiteHref } from '@/lib/location-routes'
import { cn } from '@/lib/utils'

const primaryLinks = [
  ...navigationItems.map((item) => ({ ...item, sectionId: item.href.slice(1), href: getSiteHref(item.href) })),
  { label: 'Events', href: '/events', routeType: 'events' },
]
const sectionIds = primaryLinks.map((link) => link.sectionId).filter(Boolean)

function isLinkActive(link, route, activeSectionId) {
  if (link.routeType) return route.type === link.routeType
  if (link.sectionId === 'gallery' && route.type.startsWith('gallery')) return true
  return route.type === 'home' && activeSectionId === link.sectionId
}

function SiteHeader({ route }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isScrolled, progressRef } = useScrollState()
  const activeSectionId = useActiveSection(sectionIds, route.type === 'home')
  const activeLocation = route.type === 'location' ? getLocationBySlug(route.slug) : null
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 text-cream">
      <div ref={progressRef} aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-ember via-dawn to-iris"
        style={{ transform: 'scaleX(var(--scroll-progress, 0))' }}
      />

      <Container className="relative z-40">
        <div
          className={cn(
            'mt-3 flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-3 transition-all duration-500 ease-out sm:mt-4',
            isScrolled || isMenuOpen ? 'bg-ink/90 shadow-[0_20px_50px_-20px_rgb(0_0_0/60%)] ring-1 ring-white/10 backdrop-blur-xl' : 'bg-transparent',
          )}
        >
          <BrandLockup onClick={closeMenu} />

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((link) => {
              const isActive = isLinkActive(link, route, activeSectionId)

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-cream',
                    isActive ? 'bg-white/10 text-cream' : 'text-cream/70',
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden xl:block">
              <LocationMenu activeLocation={activeLocation} />
            </div>
            <PillLink href="/#gathering" variant="glow" className="hidden h-10 px-5 sm:inline-flex">
              Join us
            </PillLink>
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-full text-cream hover:bg-white/10 hover:text-cream lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </Container>

      <MobileMenu id="mobile-navigation" isOpen={isMenuOpen} links={primaryLinks} activeLocation={activeLocation} onClose={closeMenu} />
    </header>
  )
}

export default SiteHeader

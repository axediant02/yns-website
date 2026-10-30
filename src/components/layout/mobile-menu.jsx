import { useEffect } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'

import ClientLink from '@/components/common/client-link'
import Container from '@/components/common/container'
import PillLink from '@/components/common/pill-link'
import { community, locations } from '@/data/community'
import { getLocationHref } from '@/lib/location-routes'
import { cn } from '@/lib/utils'

/** Full-screen navigation for small screens with a staggered entrance. */
function MobileMenu({ id, isOpen, links, activeLocation, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <nav
      id={id}
      aria-label="Mobile navigation"
      hidden={!isOpen}
      className="fixed inset-0 z-30 overflow-y-auto bg-ink/98 pt-28 pb-10 text-cream backdrop-blur-xl lg:hidden"
    >
      <Container>
        <ul className="grid gap-1">
          {links.map((link, index) => (
            <li key={link.href} className="animate-in fill-mode-both duration-500 fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms` }}>
              <a href={link.href} onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-semibold tracking-tight">
                {link.label}
                <ArrowUpRight className="size-5 text-cream/40" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[11px] font-semibold tracking-[0.2em] text-cream/50 uppercase">Locations</p>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {locations.map((location) => (
            <li key={location.id}>
              <ClientLink
                href={getLocationHref(location)}
                onClick={onClose}
                aria-current={activeLocation?.id === location.id ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 rounded-2xl px-3 py-3 text-sm ring-1 ring-white/10 transition hover:bg-white/5',
                  activeLocation?.id === location.id && 'bg-white/10 ring-ember/60',
                )}
              >
                <MapPin className="size-3.5 shrink-0 text-ember" aria-hidden="true" />
                {location.name}
              </ClientLink>
            </li>
          ))}
        </ul>

        <PillLink href="/#gathering" onClick={onClose} variant="glow" className="mt-10 w-full">
          Join us this Sunday
        </PillLink>
        <p className="mt-4 text-center text-sm text-cream/50">
          {community.gathering.day} · {community.gathering.time}
        </p>
      </Container>
    </nav>
  )
}

export default MobileMenu

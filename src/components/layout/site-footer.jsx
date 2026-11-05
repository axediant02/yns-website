import { ArrowUp, ArrowUpRight } from 'lucide-react'

import BrandLockup from '@/components/common/brand-lockup'
import Container from '@/components/common/container'
import { community, navigationItems } from '@/data/community'
import { getLocationBySlug, getSiteHref } from '@/lib/location-routes'

function FooterHeading({ children }) {
  return <p className="text-[11px] font-semibold tracking-[0.2em] text-cream/50 uppercase">{children}</p>
}

function SiteFooter({ route }) {
  const activeLocation = route.type === 'location' ? getLocationBySlug(route.slug) : null

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-cream">
      <Container>
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <BrandLockup />
            <p className="mt-6 leading-relaxed text-cream/60">A community for everyone interested in following Jesus together.</p>
          </div>

          <nav aria-label="Footer navigation">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-5 grid gap-3">
              {[...navigationItems, { label: 'Events', href: '/events' }, { label: 'Contact', href: '#contact' }].map((item) => (
                <li key={item.href}>
                  <a href={getSiteHref(item.href)} className="group inline-flex items-center gap-1 text-cream/80 transition-colors hover:text-cream">
                    {item.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <FooterHeading>See you Sunday</FooterHeading>
            <p className="mt-5 text-2xl font-semibold tracking-tight">{community.gathering.time}</p>
            <p className="mt-2 text-cream/60">{activeLocation ? `${activeLocation.name}, ${activeLocation.area}` : community.location}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 py-6 text-sm text-cream/50 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {community.name}
          </span>
          <button type="button" onClick={() => window.scrollTo({ top: 0 })} className="group inline-flex items-center gap-2 rounded-full transition-colors hover:text-cream">
            Back to top
            <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <p aria-hidden="true" className="pointer-events-none -mb-[0.18em] text-center text-[24vw] leading-none font-semibold tracking-[-0.07em] text-transparent select-none bg-linear-to-b from-white/12 to-white/0 bg-clip-text">
        {community.shortName}
      </p>
    </footer>
  )
}

export default SiteFooter

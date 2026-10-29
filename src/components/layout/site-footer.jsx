import { ArrowUpRight } from 'lucide-react'

import { navigationItems, community } from '@/data/community'
import { getLocationBySlug, getLocationRoute, getSiteHref } from '@/lib/location-routes'

function SiteFooter({ identity = community, location, showEditorialCopy = true }) {
  const route = getLocationRoute(window.location.pathname)
  const activeLocation = location ?? (route ? getLocationBySlug(route.slug) : null)

  return (
    <footer className="site-footer">
      <div className="page-frame footer-grid">
        <div>
          <a className="footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true">D6</span>
            <span>
              <span className="brand-name">YNS D6</span>
              {showEditorialCopy && <span className="brand-location">{identity.location}</span>}
            </span>
          </a>
          {showEditorialCopy && <p className="footer-note">A community for everyone interested in following Jesus together.</p>}
        </div>

        <div className="footer-links">
          <span className="footer-label">Explore</span>
          {navigationItems.map((item) => (
            <a key={item.href} href={getSiteHref(item.href)}>{item.label}</a>
          ))}
          <a href="/#contact">Contact <ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="footer-gathering">{showEditorialCopy ? <>
          <span className="footer-label">See you Sunday</span>
          <strong>{identity.gathering.time}</strong>
          <span>{activeLocation ? `${activeLocation.name}, ${activeLocation.area}` : identity.location}</span>
        </> : <span>Gathering details are currently unavailable.</span>}
        </div>
      </div>
      <div className="page-frame footer-bottom">
        <span>© {new Date().getFullYear()} {identity.name}</span>
      </div>
    </footer>
  )
}

export default SiteFooter

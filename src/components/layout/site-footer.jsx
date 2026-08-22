import { ArrowUpRight } from 'lucide-react'

import { navigationItems, community } from '@/data/community'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-frame footer-grid">
        <div>
          <a className="footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true">D6</span>
            <span>
              <span className="brand-name">YNS D6</span>
              <span className="brand-location">{community.location}</span>
            </span>
          </a>
          <p className="footer-note">A community for everyone interested in following Jesus together.</p>
        </div>

        <div className="footer-links">
          <span className="footer-label">Explore</span>
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a href="#contact">Contact <ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="footer-gathering">
          <span className="footer-label">See you Sunday</span>
          <strong>{community.gathering.time}</strong>
          <span>{community.location}</span>
        </div>
      </div>
      <div className="page-frame footer-bottom">
        <span>© {new Date().getFullYear()} {community.name}</span>
        <span>Built for a growing community.</span>
      </div>
    </footer>
  )
}

export default SiteFooter

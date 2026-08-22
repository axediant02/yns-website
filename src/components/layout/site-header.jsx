import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { navigationItems, community } from '@/data/community'

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
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
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
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
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="mobile-nav-cta" href="#gathering" onClick={closeMenu}>
            Join us this Sunday <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader

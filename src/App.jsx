import { useEffect, useState } from 'react'

import './App.css'

import GalleryPage from '@/components/pages/gallery-page'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import AboutSection from '@/components/sections/about-section'
import ContactSection from '@/components/sections/contact-section'
import GatheringSection from '@/components/sections/gathering-section'
import GallerySection from '@/components/sections/gallery-section'
import HeroSection from '@/components/sections/hero-section'
import LeadershipSection from '@/components/sections/leadership-section'
import StoriesSection from '@/components/sections/stories-section'

function App() {
  const [isGalleryView, setIsGalleryView] = useState(() => window.location.hash === '#gallery-all')

  useEffect(() => {
    const handleHashChange = () => setIsGalleryView(window.location.hash === '#gallery-all')

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]')

    if (isGalleryView) {
      document.title = 'YNS D6 Gallery — See the life around here.'
      description?.setAttribute('content', 'Explore illustrative Kids and Youth gallery moments from the welcoming community of YNS D6.')
      window.scrollTo(0, 0)
    } else {
      document.title = 'YNS D6 — Find your people. Follow Jesus.'
      description?.setAttribute('content', 'Youth Nation Shakers District 6 is a welcoming community in Toledo City, Cebu. Join us every Sunday from 10:00 AM to 12:00 noon.')

      const targetId = window.location.hash.slice(1)
      if (targetId) {
        window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: 'start' }))
      }
    }
  }, [isGalleryView])

  return (
    <div className="site-shell">
      <SiteHeader />
      {isGalleryView ? (
        <GalleryPage />
      ) : (
        <main>
          <HeroSection />
          <AboutSection />
          <GatheringSection />
          <GallerySection />
          <StoriesSection />
          <LeadershipSection />
          <ContactSection />
        </main>
      )}
      <SiteFooter />
    </div>
  )
}

export default App

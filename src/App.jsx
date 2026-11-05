import './App.css'

import IntroOverlay from '@/components/layout/intro-overlay'
import SiteFooter from '@/components/layout/site-footer'
import SiteHeader from '@/components/layout/site-header'
import EventsPage from '@/components/pages/events-page'
import GalleryPage from '@/components/pages/gallery-page'
import HomePage from '@/components/pages/home-page'
import LocationPage from '@/components/pages/location-page'
import useIntro from '@/hooks/use-intro'
import usePageMeta from '@/hooks/use-page-meta'
import useSiteRoute from '@/hooks/use-site-route'

// Hash links double as routes here, so move focus without changing the hash.
function focusMainContent(event) {
  event.preventDefault()
  document.getElementById('main-content')?.focus()
}

function RoutedPage({ route, isReady }) {
  switch (route.type) {
    case 'events':
      return <EventsPage />
    case 'location':
      return <LocationPage slug={route.slug} />
    case 'gallery-index':
    case 'gallery-event':
      return <GalleryPage route={route} />
    default:
      return <HomePage isReady={isReady} />
  }
}

function App() {
  const route = useSiteRoute()
  const intro = useIntro()

  usePageMeta(route)

  return (
    <div className="min-h-svh overflow-x-clip bg-background">
      <a href="#main-content" onClick={focusMainContent} className="sr-only z-[110] rounded-full bg-cream px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        Skip to content
      </a>
      <IntroOverlay phase={intro.phase} onSkip={intro.skip} />
      <SiteHeader route={route} />
      <div id="main-content" tabIndex={-1} className="outline-none">
        <RoutedPage route={route} isReady={intro.isReady} />
      </div>
      <SiteFooter route={route} />
    </div>
  )
}

export default App

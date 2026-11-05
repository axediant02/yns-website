import { navigationItems } from '@/data/community'
import { getSectionPageHref } from '@/lib/site-route'

/** Header/footer links: Home, each homepage section's own page, plus Events. */
export const primaryLinks = [
  { label: 'Home', pageType: 'home', href: '/' },
  ...navigationItems.map((item) => {
    const sectionId = item.href.slice(1)
    return { label: item.label, pageType: sectionId, href: getSectionPageHref(sectionId) }
  }),
  { label: 'Events', pageType: 'events', href: '/events' },
]

export const contactLink = { label: 'Contact', pageType: 'contact', href: getSectionPageHref('contact') }

/** True when the link opens the page currently shown; gallery covers the index and album views. */
export function isCurrentPageLink(link, route) {
  if (link.pageType === 'gallery') return route.type.startsWith('gallery')
  return route.type === link.pageType
}

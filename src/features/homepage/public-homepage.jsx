import SiteHeader from '@/components/layout/site-header'
import SiteFooter from '@/components/layout/site-footer'
import HomepageContentState from './homepage-content-state'

// Approved application branding only. Editorial facts must come from the public API.
const identity = { name: 'Youth Nation Shakers District 6', shortName: 'YNS D6' }

export default function PublicHomepage() {
  // No public contents route/schema exists in contract dashboard-1 yet.
  // Do not guess an endpoint or render CMS preview fixtures as published content.
  return <div className="site-shell">
    <SiteHeader identity={identity} items={[]} showEditorialCopy={false} />
    <HomepageContentState />
    <SiteFooter identity={identity} showEditorialCopy={false} />
  </div>
}

import { Button } from '@/components/ui/button'

const sections = [
  { id: 'top', label: 'YNS D6', className: 'hero-section' },
  { id: 'about', label: 'About', className: 'about-section section-dark' },
  { id: 'gathering', label: 'Gathering', className: 'gathering-section' },
  { id: 'gallery', label: 'Gallery', className: 'gallery-section' },
  { id: 'stories', label: 'Stories', className: 'stories-section section-acid' },
  { id: 'leadership', label: 'Leadership', className: 'leadership-section section-dark' },
  { id: 'contact', label: 'Contact', className: 'contact-section section-coral' },
]

export default function HomepageContentState({ status = 'unavailable', onRetry }) {
  const loading = status === 'loading'
  const message = loading ? 'Loading content…' : status === 'empty' ? 'No published content is available yet.' : 'Content is temporarily unavailable. Please check back later.'
  return <main aria-busy={loading}>
    {sections.map(({ id, label, className }, index) => <section key={id} id={id} className={`${className} section-frame`}>
      <div className="page-frame">
        <div className="section-heading">
          {index === 0 ? <h1 className="text-5xl font-black tracking-tight sm:text-7xl">{label}</h1> : <h2>{label}</h2>}
          <p role={!loading && status !== 'empty' && index === 0 ? 'alert' : 'status'}>{message}</p>
        </div>
        {loading && <div aria-hidden="true" className="mt-8 space-y-4 motion-reduce:animate-none">
          <div className="h-6 w-3/4 max-w-xl animate-pulse rounded-lg bg-current opacity-10 motion-reduce:animate-none" />
          <div className="h-4 w-1/2 max-w-md animate-pulse rounded-lg bg-current opacity-10 motion-reduce:animate-none" />
        </div>}
        {index === 0 && !loading && status !== 'empty' && onRetry && <Button className="primary-action mt-6" onClick={onRetry}>Try again</Button>}
      </div>
    </section>)}
  </main>
}

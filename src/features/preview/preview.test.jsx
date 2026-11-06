import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import GatheringSection from '@/components/sections/gathering-section'
import ContactSection from '@/components/sections/contact-section'
import StoriesSection from '@/components/sections/stories-section'
import LeadershipSection from '@/components/sections/leadership-section'
import LocationPage from '@/components/pages/location-page'
import { GalleryEventView } from '@/components/pages/gallery-page'
import EventsPage from '@/components/pages/events-page'
import { galleryEvents, leadershipPlaceholders, locations, storyPlaceholders } from '@/data/community'
import PreviewRenderer from './preview-renderer'
import PreviewPage from './preview-page'
import { previewCatalog } from './preview-catalog'
import { previewChannel, readPhotos, safeLink, validatePreview } from './preview-validation'
import { buildPreviewSite, validateSitePreview } from './site-preview-model'
import HomePage from '@/components/pages/home-page'

const originalParent = Object.getOwnPropertyDescriptor(window, 'parent')
beforeEach(() => {
  // Template comparisons include a gathering countdown, so keep both renders at one instant.
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-11-06T12:00:00Z'))
  window.matchMedia = vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  window.requestAnimationFrame = vi.fn((callback) => { callback(0); return 1 })
  window.cancelAnimationFrame = vi.fn()
  window.scrollTo = vi.fn()
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const top = { about: 900, 'preview-story-0': 1800, 'preview-event-new-event': 600 }[this.id] ?? 0
    return { top, bottom: top, left: 0, right: 0, x: 0, y: top, width: 0, height: 0, toJSON: () => ({}) }
  })
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  Object.defineProperty(window, 'parent', originalParent)
  vi.restoreAllMocks()
})

describe('website-owned templates and starting content', () => {
  it('renders supplied About statement edits in the standalone About preview', () => {
    const draft = validatePreview('about', {
      ...previewCatalog.find((module) => module.id === 'about').records[0].values,
      mission: 'Edited mission text', vision: 'Edited vision text', coreValues: 'First edited value\nSecond edited value',
    })
    const html = renderToStaticMarkup(<PreviewRenderer draft={draft} />)
    expect(html).toContain('Edited mission text')
    expect(html).toContain('Edited vision text')
    expect(html).toContain('First edited value')
    expect(html).toContain('Second edited value')
    expect(html).not.toContain('Activating the youth to be partakers')
  })

  it.each([
    ['hero', <HeroSection />], ['about', <AboutSection />], ['gathering', <GatheringSection />], ['contact', <ContactSection />],
    ['story', <StoriesSection stories={[storyPlaceholders[0]]} />], ['leader', <LeadershipSection leaders={[leadershipPlaceholders[0]]} />],
    ['location', <LocationPage slug={locations[0].id} />], ['album', <GalleryEventView event={galleryEvents[0]} />],
  ])('renders %s seed content through the same markup as the actual website', (moduleId, component) => {
    const module = previewCatalog.find((item) => item.id === moduleId)
    const draft = validatePreview(moduleId, module.records[0].values)
    expect(renderToStaticMarkup(<PreviewRenderer draft={draft} />)).toBe(renderToStaticMarkup(component))
  })

  it('provides an event template without inventing event records or changing the default empty page', () => {
    const module = previewCatalog.find((item) => item.id === 'event')
    expect(module.records).toEqual([])
    const values = { title: 'An unsaved test event', description: 'Test description', startsAt: '2026-11-01T10:00', endsAt: '2026-11-01T12:00', location: 'Draft venue' }
    const html = renderToStaticMarkup(<PreviewRenderer draft={validatePreview('event', values)} />)
    expect(html).toBe(renderToStaticMarkup(<EventsPage events={[values]} />))
    expect(html).toContain('10:00 AM')
    expect(html).toContain('Philippine time')
    expect(renderToStaticMarkup(<EventsPage />)).toContain('coming soon.')
  })

  it('rejects malformed drafts and prevents active content in links or photo URLs', () => {
    expect(validatePreview('missing', {})).toBeNull()
    expect(validatePreview('hero', { heading: {} })).toBeNull()
    expect(validatePreview('album', { photos: '{}' })).toBeNull()
    expect(validatePreview('hero', { heading: 'x'.repeat(100001) })).toBeNull()
    expect(safeLink('javascript:alert(1)')).toBe('')
    expect(safeLink('//other.example')).toBe('')
    expect(safeLink('https://user:password@example.test')).toBe('')
    expect(safeLink('/events')).toBe('/events')
    expect(safeLink('#about')).toBe('#about')
    expect(readPhotos('[{"src":"data:image/svg+xml,<svg/>","alt":"Unsafe","title":"Unsafe"}]')).toEqual([])
    const draft = validatePreview('hero', { ...previewCatalog[0].records[0].values, primaryHref: 'javascript:alert(1)' })
    expect(draft.values.primaryHref).toBe('')
  })
})

function embeddedPreview() {
  const frame = document.createElement('iframe')
  document.body.append(frame)
  const parent = frame.contentWindow
  const post = vi.spyOn(parent, 'postMessage')
  Object.defineProperty(window, 'parent', { configurable: true, value: parent })
  render(<PreviewPage />)
  function message(data, origin = 'http://localhost:5173', source = parent) {
    act(() => { window.dispatchEvent(new MessageEvent('message', { origin, source, data: { channel: previewChannel, session: 'test-session', ...data } })) })
  }
  return { message, post, frame }
}

describe('unsaved preview message boundary', () => {
  it('starts empty, validates origin/source/session, renders escaped text, and prevents link navigation', () => {
    const { message, post, frame } = embeddedPreview()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow, noarchive')
    message({ type: 'hello' }, 'https://other.example')
    message({ type: 'hello' }, 'http://localhost:5173', window)
    expect(post).not.toHaveBeenCalled()
    message({ type: 'hello' })
    expect(post).toHaveBeenCalledWith(expect.objectContaining({ type: 'ready', catalog: previewCatalog }), 'http://localhost:5173')
    const values = { ...previewCatalog[0].records[0].values, heading: '<script>draft text</script>' }
    const active = { moduleId: 'hero', recordId: 'current', view: 'section', scrollRevision: 0 }
    const patches = [{ moduleId: 'hero', recordId: 'current', values }]
    message({ type: 'render-site', session: 'incorrect', active, patches, requestId: 'one' })
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    message({ type: 'render-site', active, patches, requestId: 'wrong-origin' }, 'https://other.example')
    message({ type: 'render-site', active, patches, requestId: 'wrong-window' }, 'http://localhost:5173', window)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    message({ type: 'render-site', active, patches, requestId: 'two' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('<script>draft text</script>')
    expect(document.querySelector('script')).toBeNull()
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'rendered', requestId: 'two' }), 'http://localhost:5173')
    for (const link of screen.getAllByRole('link', { name: /Join us this Sunday/ })) expect(fireEvent.click(link)).toBe(false)
    message({ type: 'render-site', active, patches: [{ moduleId: 'hero', recordId: 'current', values: { heading: [] } }], requestId: 'invalid' })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'invalid' }), 'http://localhost:5173')
    message({ type: 'render-site', active, patches: [], requestId: 'reset' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Find your people.')
    cleanup()
    const count = post.mock.calls.length
    message({ type: 'hello' })
    expect(post).toHaveBeenCalledTimes(count)
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
    frame.remove()
  })

  it('does not accept messages when opened as a standalone public page', () => {
    const post = vi.spyOn(window, 'postMessage')
    render(<PreviewPage />)
    act(() => { window.dispatchEvent(new MessageEvent('message', { origin: 'http://localhost:5173', source: window, data: { channel: previewChannel, type: 'hello', session: 'test' } })) })
    expect(post).not.toHaveBeenCalled()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})

const selection = (moduleId = 'hero', recordId = 'current', view = 'section', scrollRevision = 0) => ({ moduleId, recordId, view, scrollRevision })
function patch(moduleId, recordId, changes) {
  const original = previewCatalog.find((module) => module.id === moduleId)?.records.find((record) => record.id === recordId)
  return { moduleId, recordId, values: { ...original?.values, ...changes } }
}

describe('full website preview', () => {
  it('retains the full homepage template composition, with only preview scroll IDs added', () => {
    const site = buildPreviewSite([])
    const preview = renderToStaticMarkup(<HomePage sections={site.sections} />).replace(/ id="preview-[^"]*"/g, '')
    expect(preview).toBe(renderToStaticMarkup(<HomePage sections={{ leadership: { leaders: leadershipPlaceholders } }} />))
  })

  it('renders all homepage sections and preserves simultaneous edits and untouched records', () => {
    const { message, frame } = embeddedPreview()
    message({ type: 'hello' })
    const patches = [
      patch('hero', 'current', { heading: 'Edited hero heading' }),
      patch('about', 'current', { heading: 'Edited about heading' }),
      patch('story', '0', { title: 'Edited first story' }),
      patch('leader', 'new-leader', { name: 'Unsaved leader', description: 'Draft biography' }),
    ]
    message({ type: 'render-site', active: selection('about'), patches, requestId: 'full' })
    for (const id of ['top', 'about', 'gathering', 'gallery', 'stories', 'leadership', 'contact']) expect(document.getElementById(id)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Edited hero heading')
    expect(screen.getByRole('heading', { name: /Edited about heading/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Edited first story' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: storyPlaceholders[1].title })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Unsaved leader' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: leadershipPlaceholders[0].name })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenLastCalledWith({ behavior: 'instant', top: 804 })
    const count = window.scrollTo.mock.calls.length
    const main = screen.getByRole('main')
    patches[1] = patch('about', 'current', { heading: 'Another edit to About' })
    message({ type: 'render-site', active: selection('about'), patches, requestId: 'typing' })
    expect(screen.getByRole('heading', { name: /Another edit to About/ })).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledTimes(count)
    expect(screen.getByRole('main')).toBe(main)
    message({ type: 'render-site', active: selection('story', '0', 'section', 1), patches, requestId: 'select-story' })
    expect(window.scrollTo).toHaveBeenLastCalledWith({ behavior: 'instant', top: 1704 })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Edited hero heading')
    frame.remove()
  })

  it('browses complete albums and returns home without changing the URL or losing edits', () => {
    const { message, frame } = embeddedPreview()
    message({ type: 'hello' })
    const href = window.location.href
    const patches = [patch('hero', 'current', { heading: 'Draft hero survives navigation' }), patch('album', galleryEvents[0].id, { title: 'Edited album title' })]
    message({ type: 'render-site', active: selection(), patches, requestId: 'home' })
    fireEvent.click(screen.getByRole('link', { name: 'Open Edited album title photo album' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Edited album title')
    expect(screen.getByLabelText('Edited album title photos')).toBeInTheDocument()
    patches[1] = patch('album', galleryEvents[0].id, { title: 'Edited album title', description: 'A live edit while browsing the album' })
    message({ type: 'render-site', active: selection(), patches, requestId: 'album-edit' })
    expect(screen.getByText('A live edit while browsing the album')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Edited album title')
    fireEvent.click(within(screen.getByRole('banner')).getByRole('link', { name: /YNS D6/ }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Draft hero survives navigation')
    expect(window.location.href).toBe(href)
    frame.remove()
  })

  it('uses full location and event pages with live collection and gathering values', () => {
    const { message, frame } = embeddedPreview()
    message({ type: 'hello' })
    const patches = [patch('location', locations[0].id, { welcomeMessage: 'An edited welcome message' }), patch('gathering', 'current', { time: 'Updated gathering time' })]
    message({ type: 'render-site', active: selection('location', locations[0].id, 'detail'), patches, requestId: 'location' })
    expect(screen.getByText('An edited welcome message')).toBeInTheDocument()
    expect(screen.getAllByText('Updated gathering time')).toHaveLength(2)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    message({ type: 'render-site', active: selection('event', null), patches, requestId: 'empty-events' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('More events')
    patches.push(patch('event', 'new-event', { title: 'New draft event', startsAt: '2026-11-01T10:00', description: 'Draft event details' }))
    message({ type: 'render-site', active: selection('event', 'new-event'), patches, requestId: 'event' })
    expect(screen.getByRole('heading', { name: 'New draft event' })).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenLastCalledWith({ behavior: 'instant', top: 504 })
    frame.remove()
  })

  it('rejects unknown, duplicate, and malformed snapshot records and unsafe selection values', () => {
    expect(validateSitePreview(selection(), [patch('missing', 'one', {})])).toBeNull()
    const record = patch('story', '0', { title: 'Draft' })
    expect(validateSitePreview(selection(), [record, record])).toBeNull()
    expect(validateSitePreview(selection('hero', 'missing'), [])).toBeNull()
    expect(validateSitePreview({ ...selection(), scrollRevision: -1 }, [])).toBeNull()
    expect(validateSitePreview(selection(), [patch('hero', 'new-singleton', {})])).toBeNull()
    expect(validateSitePreview(selection(), [patch('story', '0', { title: {} })])).toBeNull()
  })

  it('uses smooth scrolling when reduced motion is not requested', () => {
    window.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const { message, frame } = embeddedPreview()
    message({ type: 'hello' })
    message({ type: 'render-site', active: selection('about'), patches: [], requestId: 'scroll' })
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 804, behavior: 'smooth' })
    frame.remove()
  })
})

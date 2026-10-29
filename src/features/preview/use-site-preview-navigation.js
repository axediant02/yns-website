import { useEffect, useState } from 'react'
import { previewRecordId } from './site-preview-model'

const sectionIds = { hero: 'top', about: 'about', gathering: 'gathering', contact: 'contact', story: 'stories', leader: 'leadership', location: 'locations', album: 'gallery', event: 'events-top' }

function selectedRoute(active) {
  if (active.moduleId === 'event') return { type: 'events', anchor: active.recordId ? previewRecordId('event', active.recordId) : 'events-top' }
  if (active.view === 'detail' && active.recordId && ['location', 'album'].includes(active.moduleId)) return { type: active.moduleId, id: active.recordId }
  return { type: 'home', anchor: active.recordId && ['story', 'leader', 'location', 'album'].includes(active.moduleId) ? previewRecordId(active.moduleId, active.recordId) : sectionIds[active.moduleId] }
}

function routeForLink(href, current) {
  try {
    const url = new URL(href, `${window.location.origin}/`)
    if (url.origin !== window.location.origin) return null
    if (url.hash === '#gallery-all') return { type: 'gallery' }
    if (url.hash.startsWith('#gallery-event-')) return { type: 'album', id: url.hash.slice('#gallery-event-'.length) }
    if (href.startsWith('#location-')) return { ...current, anchor: url.hash.slice(1) }
    const place = url.pathname.match(/^\/locations\/([^/]+)\/?$/)
    if (place) return { type: 'location', id: decodeURIComponent(place[1]) }
    if (/^\/events\/?$/.test(url.pathname)) return { type: 'events', anchor: 'events-top' }
    return url.pathname === '/' ? { type: 'home', anchor: url.hash.slice(1) || 'top' } : null
  } catch { return null }
}

export function useSitePreviewNavigation(active) {
  const [navigation, setNavigation] = useState(null)
  const selectionKey = JSON.stringify(active)
  const chosen = navigation?.selectionKey === selectionKey ? navigation : null
  const route = chosen?.route ?? selectedRoute(active)
  const targetId = route.anchor ?? ({ location: 'location-top', album: 'gallery-top', gallery: 'gallery-top', events: 'events-top' }[route.type] || 'top')
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (target) window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 96), behavior: reduced ? 'instant' : 'smooth' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [selectionKey, targetId, route.type, route.id, chosen?.revision])

  function navigate(event) {
    const link = event.target.closest('a')
    if (!link) return
    event.preventDefault()
    const next = routeForLink(link.getAttribute('href') || '', route)
    if (next) setNavigation((previous) => ({ selectionKey, route: next, revision: (previous?.revision ?? 0) + 1 }))
  }
  return { route, navigate }
}

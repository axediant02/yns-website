import { community, galleryEvents, locations } from '@/data/community'
import { previewCatalog } from './preview-catalog'
import { readPhotos, validatePreview } from './preview-validation'

const originals = new Map(previewCatalog.map((module) => [module.id,
  new Map(module.records.map((record) => [record.id, validatePreview(module.id, record.values).values])),
]))

export const previewRecordId = (moduleId, recordId) => `preview-${moduleId}-${recordId}`

export function validateSitePreview(active, patches) {
  if (!active || typeof active !== 'object' || !originals.has(active.moduleId)) return null
  if (active.recordId !== null && (typeof active.recordId !== 'string' || !active.recordId || active.recordId.length > 200)) return null
  if (!['section', 'detail'].includes(active.view) || !Number.isSafeInteger(active.scrollRevision) || active.scrollRevision < 0) return null
  if (!Array.isArray(patches) || patches.length > 300) return null
  const unique = new Set()
  const validated = []
  for (const patch of patches) {
    if (!patch || typeof patch.recordId !== 'string' || !patch.recordId || patch.recordId.length > 200) return null
    const module = previewCatalog.find((item) => item.id === patch.moduleId)
    if (!module || (module.mode === 'singleton' && !originals.get(module.id).has(patch.recordId))) return null
    const key = `${module.id}:${patch.recordId}`
    if (unique.has(key)) return null
    unique.add(key)
    const draft = validatePreview(module.id, patch.values)
    if (!draft) return null
    validated.push({ moduleId: module.id, recordId: patch.recordId, values: draft.values })
  }
  if (active.recordId !== null && !originals.get(active.moduleId).has(active.recordId) && !unique.has(`${active.moduleId}:${active.recordId}`)) return null
  return { active: { moduleId: active.moduleId, recordId: active.recordId, view: active.view, scrollRevision: active.scrollRevision }, patches: validated }
}

export function buildPreviewSite(patches) {
  const records = new Map([...originals].map(([moduleId, items]) => [moduleId, new Map(items)]))
  for (const patch of patches) records.get(patch.moduleId).set(patch.recordId, patch.values)
  const one = (moduleId) => records.get(moduleId).values().next().value
  const many = (moduleId) => [...records.get(moduleId)].map(([id, values]) => ({ ...values, id, previewId: previewRecordId(moduleId, id) }))
  const gathering = one('gathering')
  const hero = one('hero')
  const about = one('about')
  const identity = { ...community, location: hero.location, gathering, ...about, coreValues: about.coreValues.split('\n').filter(Boolean) }
  const albumsById = new Map(galleryEvents.map((album) => [album.id, album]))
  const locationsById = new Map(locations.map((location) => [location.id, location]))
  const albums = many('album').map((album) => ({ ...albumsById.get(album.id), ...album, photos: readPhotos(album.photos) ?? [] }))
  const localPlaces = many('location').map((location) => ({
    ...locationsById.get(location.id), ...location,
    contact: { href: location.contactHref }, image: { src: location.imageSrc, alt: location.imageAlt },
  }))
  return {
    identity, gathering, albums, locations: localPlaces, events: many('event'),
    sections: {
      hero: { content: hero, location: hero.location, gathering: { day: hero.day === community.gathering.day ? gathering.day : hero.day } },
      about: { content: about, identity },
      gathering: { content: gathering, gathering, audience: gathering.audience, items: localPlaces },
      gallery: { events: albums }, stories: { stories: many('story') },
      leadership: { leaders: many('leader') }, contact: { content: one('contact'), contact: one('contact') },
    },
  }
}

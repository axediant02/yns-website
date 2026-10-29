import { previewCatalog } from './preview-catalog'

export const previewChannel = 'yns-editor-preview-v2'

export function safeLink(value, image = false) {
  if (!value) return ''
  if (!image && /^(#[\w-]*|\/(?!\/)[^\\\s]*)$/.test(value)) return value
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : ''
  } catch { return '' }
}

export function readPhotos(value) {
  try {
    const photos = JSON.parse(value || '[]')
    if (!Array.isArray(photos) || photos.length > 100) return null
    return photos.map((photo, index) => {
      if (!photo || typeof photo.src !== 'string' || typeof photo.alt !== 'string' || typeof photo.title !== 'string') throw new Error('Invalid photo')
      return { id: String(index), src: safeLink(photo.src, true), alt: photo.alt, title: photo.title, size: ['tall', 'wide', 'standard'].includes(photo.size) ? photo.size : 'standard' }
    }).filter((photo) => photo.src)
  } catch { return null }
}

export function validatePreview(moduleId, input) {
  const module = previewCatalog.find((item) => item.id === moduleId)
  if (!module || !input || typeof input !== 'object' || Array.isArray(input)) return null
  const values = {}
  for (const field of module.fields) {
    const value = input[field.key] ?? ''
    if (typeof value !== 'string' || value.length > 100000) return null
    if (field.type === 'photos' && !readPhotos(value)) return null
    values[field.key] = ['link', 'image'].includes(field.type) ? safeLink(value, field.type === 'image') : value
  }
  if (moduleId === 'location') values.locationId = module.records.some((item) => item.id === input.locationId) ? input.locationId : 'unsaved-location'
  return { moduleId, values }
}

export function cmsPreviewOrigin() {
  const configured = import.meta.env.VITE_CMS_PREVIEW_ORIGIN || (import.meta.env.DEV ? 'http://localhost:5173' : '')
  try {
    const url = new URL(configured)
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash ? url.origin : null
  } catch { return null }
}

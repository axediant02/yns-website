import axios from 'axios'

function readLeader({ recordId, values }) {
  if (typeof recordId !== 'string' || !recordId || !values || Array.isArray(values) || typeof values !== 'object') {
    throw new Error('INVALID_LEADERSHIP_RESPONSE')
  }
  const fields = ['name', 'role', 'description', 'imageSrc', 'imageAlt']
  if (fields.some((field) => values[field] !== undefined && typeof values[field] !== 'string') || !values.name?.trim()) {
    throw new Error('INVALID_LEADERSHIP_RESPONSE')
  }
  if (values.imageSrc) {
    const url = new URL(values.imageSrc)
    if (url.protocol !== 'https:' || url.username || url.password || !values.imageAlt?.trim()) {
      throw new Error('INVALID_LEADERSHIP_PORTRAIT')
    }
  }
  return { id: recordId, ...Object.fromEntries(fields.map((field) => [field, values[field] ?? ''])) }
}

/** One published collection read; never use authenticated CMS endpoints on the website. */
export async function loadPublishedLeaders(signal) {
  const baseURL = import.meta.env.VITE_API_BASE_URL?.trim()
  if (!baseURL) throw new Error('API_NOT_CONFIGURED')
  const response = await axios.get('/api/v1/public/content', {
    baseURL, signal, withCredentials: false, timeout: 15000,
  })
  if (!Array.isArray(response.data?.data)) throw new Error('INVALID_CONTENT_RESPONSE')
  const leaders = []
  const ids = new Set()
  for (const record of response.data.data) {
    if (!record || typeof record.moduleId !== 'string') throw new Error('INVALID_CONTENT_RESPONSE')
    if (record.moduleId !== 'leader') continue
    const leader = readLeader(record)
    if (ids.has(leader.id)) throw new Error('DUPLICATE_LEADERSHIP_RECORD')
    ids.add(leader.id)
    leaders.push(leader)
  }
  return leaders
}

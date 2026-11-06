import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadPublishedLeaders } from './leadership'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))
const values = { name: 'Test officer', role: 'Test role', description: 'Test introduction', imageSrc: 'https://example.test/officer.jpg', imageAlt: 'Test portrait' }
const record = { moduleId: 'leader', recordId: 'officer', values }

beforeEach(() => { vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.test') })
afterEach(() => { vi.unstubAllEnvs(); vi.resetAllMocks() })

describe('published leadership transport', () => {
  it('reads one public collection without credentials and maps only leadership values', async () => {
    axios.get.mockResolvedValue({ data: { data: [{ moduleId: 'story', recordId: 'story', values: {} }, record] } })
    const signal = new AbortController().signal
    expect(await loadPublishedLeaders(signal)).toEqual([{ id: 'officer', ...values }])
    expect(axios.get).toHaveBeenCalledExactlyOnceWith('/api/v1/public/content', {
      baseURL: 'https://api.example.test', signal, withCredentials: false, timeout: 15000,
    })
  })

  it('keeps empty collections empty and supports existing text-only profiles', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: [] } })
    expect(await loadPublishedLeaders()).toEqual([])
    axios.get.mockResolvedValueOnce({ data: { data: [{ ...record, values: { name: 'Test officer' } }] } })
    expect(await loadPublishedLeaders()).toEqual([{ id: 'officer', name: 'Test officer', role: '', description: '', imageSrc: '', imageAlt: '' }])
  })

  it.each([
    {}, { data: [{}] }, { data: [{ ...record, values: [] }] },
    { data: [{ ...record, values: { ...values, role: 7 } }] },
    { data: [{ ...record, values: { ...values, imageSrc: 'javascript:alert(1)' } }] },
    { data: [{ ...record, values: { ...values, imageSrc: 'https://user:password@example.test/a.jpg' } }] },
    { data: [{ ...record, values: { ...values, imageAlt: '' } }] },
    { data: [record, record] },
  ])('rejects malformed or unsafe data without falling back to sample officers', async (data) => {
    axios.get.mockResolvedValue({ data })
    await expect(loadPublishedLeaders()).rejects.toThrow()
  })

  it('does not guess an API origin when configuration is absent', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '')
    await expect(loadPublishedLeaders()).rejects.toThrow('API_NOT_CONFIGURED')
    expect(axios.get).not.toHaveBeenCalled()
  })
})

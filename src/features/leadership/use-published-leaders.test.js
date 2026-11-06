import { afterEach, describe, expect, it, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import { createLeadershipStore } from './use-published-leaders'

afterEach(() => { vi.restoreAllMocks() })

describe('shared leadership reads', () => {
  it('shares the StrictMode probe and concurrent subscriptions, then reuses the result', async () => {
    let finish
    const load = vi.fn(() => new Promise((resolve) => { finish = resolve }))
    const store = createLeadershipStore(load)
    const probe = store.subscribe(vi.fn())
    probe()
    const release = store.subscribe(vi.fn())
    const other = store.subscribe(vi.fn())
    await Promise.resolve()
    expect(load).toHaveBeenCalledTimes(1)
    expect(load.mock.calls[0][0].aborted).toBe(false)
    finish([{ id: 'test', name: 'Test officer' }])
    await waitFor(() => expect(store.getSnapshot().status).toBe('ready'))
    release()
    other()
    await Promise.resolve()
    const again = store.subscribe(vi.fn())
    expect(store.getSnapshot().leaders[0].name).toBe('Test officer')
    expect(load).toHaveBeenCalledTimes(1)
    again()
  })

  it('cancels when the final consumer leaves without reporting or retaining stale results', async () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => {})
    let finish
    const load = vi.fn(() => new Promise((resolve) => { finish = resolve }))
    const store = createLeadershipStore(load)
    const release = store.subscribe(vi.fn())
    release()
    await Promise.resolve()
    expect(load.mock.calls[0][0].aborted).toBe(true)
    finish([{ id: 'stale', name: 'Stale officer' }])
    await Promise.resolve()
    expect(store.getSnapshot()).toEqual({ status: 'loading', leaders: [] })
    expect(report).not.toHaveBeenCalled()
  })

  it('reports safe failure context once and supports a successful empty retry', async () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => {})
    const load = vi.fn().mockRejectedValueOnce(Object.assign(new Error('Private response details'), { response: { status: 503 } })).mockResolvedValueOnce([])
    const store = createLeadershipStore(load)
    const release = store.subscribe(vi.fn())
    await waitFor(() => expect(store.getSnapshot().status).toBe('error'))
    expect(report).toHaveBeenCalledTimes(1)
    expect(JSON.stringify(report.mock.calls)).not.toContain('Private response details')
    store.reload()
    expect(store.getSnapshot().status).toBe('loading')
    await waitFor(() => expect(store.getSnapshot()).toEqual({ status: 'ready', leaders: [] }))
    expect(load).toHaveBeenCalledTimes(2)
    release()
  })
})

import { useSyncExternalStore } from 'react'
import { loadPublishedLeaders } from '@/api/leadership'

const pending = { status: 'loading', leaders: [] }

/** Shares one collection request across consumers and React StrictMode subscriptions. */
export function createLeadershipStore(load = loadPublishedLeaders) {
  let snapshot = pending
  let request = null
  const listeners = new Set()
  const notify = () => listeners.forEach((listener) => listener())

  function reload() {
    if (request) return
    const current = new AbortController()
    request = current
    snapshot = pending
    notify()
    load(current.signal).then((leaders) => {
      if (request !== current) return
      snapshot = { status: 'ready', leaders }
      notify()
    }).catch((error) => {
      if (request !== current || current.signal.aborted) return
      console.error('Published leadership could not be loaded', {
        feature: 'leadership', operation: 'load-published', code: 'LEADERSHIP_UNAVAILABLE',
        status: error?.response?.status, errorType: error instanceof Error ? error.name : 'UnknownError',
      })
      snapshot = { status: 'error', leaders: [] }
      notify()
    }).finally(() => {
      if (request === current) request = null
    })
  }

  function subscribe(listener) {
    listeners.add(listener)
    if (snapshot.status === 'loading') reload()
    return () => {
      listeners.delete(listener)
      // A StrictMode resubscription in the same turn keeps the shared read alive.
      queueMicrotask(() => {
        if (!listeners.size && request) {
          request.abort()
          request = null
          snapshot = pending
        }
      })
    }
  }

  return { subscribe, getSnapshot: () => snapshot, reload }
}

const store = createLeadershipStore()

export function usePublishedLeaders() {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)
  return { ...state, reload: store.reload }
}

import { useCallback, useState } from 'react'

/**
 * Lightbox state scoped to one photo collection at a time.
 * A collection is any object with `title` and `photos`.
 */
function usePhotoViewer() {
  const [selection, setSelection] = useState(null)

  const open = useCallback((collection, index) => setSelection({ collection, index }), [])
  const close = useCallback(() => setSelection(null), [])

  const step = useCallback((delta) => {
    setSelection((current) => {
      if (!current) return current
      const count = current.collection.photos.length
      return { ...current, index: (current.index + delta + count) % count }
    })
  }, [])

  const showPrevious = useCallback(() => step(-1), [step])
  const showNext = useCallback(() => step(1), [step])

  return {
    photo: selection ? selection.collection.photos[selection.index] : null,
    collection: selection?.collection ?? null,
    position: selection ? selection.index + 1 : 0,
    total: selection?.collection.photos.length ?? 0,
    open,
    close,
    showPrevious,
    showNext,
  }
}

export default usePhotoViewer

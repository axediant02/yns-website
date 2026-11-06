import { useState } from 'react'
import { ImageOff } from 'lucide-react'

import { photoStripContent } from '@/data/photo-strip'

function PhotoStripImage({ photo, isCopy }) {
  const [hasError, setHasError] = useState(false)

  function handleError() {
    setHasError(true)
    // The second loop is decorative; report each failed original only once.
    if (!isCopy && !hasError) {
      console.error('Homepage slider photo could not be loaded', {
        feature: 'homepage-photo-strip', operation: 'load-image', code: 'IMAGE_LOAD_FAILED', photoId: photo.id,
      })
    }
  }

  return (
    <figure className="relative aspect-[4/3] w-64 shrink-0 overflow-hidden bg-sand sm:w-80 lg:w-96 motion-reduce:w-full">
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center text-muted-foreground">
          <ImageOff className="size-7" aria-hidden="true" />
          <p className="text-sm">{photoStripContent.unavailable}</p>
        </div>
      ) : (
        <img src={photo.src} alt={isCopy ? '' : photo.alt} width="800" height="600" loading="lazy" decoding="async" onError={handleError} className="size-full object-cover" />
      )}
      <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-cream">Placeholder</span>
    </figure>
  )
}

export default PhotoStripImage

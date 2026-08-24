import { useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

function PhotoLightbox({ photo, collectionTitle, onClose, onPrevious, onNext }) {
  useEffect(() => {
    if (!photo) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrevious, photo])

  if (!photo) return null

  return (
    <Dialog open={Boolean(photo)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="gallery-lightbox">
        <div className="gallery-lightbox-image-wrap">
          <img src={photo.src} alt={photo.alt} />
          <button type="button" className="gallery-lightbox-nav gallery-lightbox-previous" onClick={onPrevious} aria-label="View previous photo">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="gallery-lightbox-nav gallery-lightbox-next" onClick={onNext} aria-label="View next photo">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="gallery-lightbox-caption">
          <div>
            <span>{collectionTitle}</span>
            <DialogTitle>{photo.title}</DialogTitle>
            <DialogDescription>{photo.alt}</DialogDescription>
          </div>
          <ArrowRight aria-hidden="true" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PhotoLightbox

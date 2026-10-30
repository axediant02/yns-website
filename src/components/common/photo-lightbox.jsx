import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

function LightboxNavButton({ label, onClick, className, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-cream ring-1 ring-white/20 backdrop-blur transition hover:scale-105 hover:bg-ink/80 ${className}`}
    >
      {children}
    </button>
  )
}

function PhotoLightbox({ photo, collectionTitle, position, total, onClose, onPrevious, onNext }) {
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
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[min(100%-2rem,72rem)] gap-0 overflow-hidden rounded-3xl border-0 bg-ink p-0 text-cream ring-white/10 sm:max-w-[min(100%-2rem,72rem)] [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:bg-ink/60 [&>[data-slot=dialog-close]]:text-cream">
        <div className="relative bg-black">
          <img key={photo.id} src={photo.src} alt={photo.alt} className="max-h-[72vh] w-full animate-in object-contain duration-500 fade-in zoom-in-[0.98]" />
          <LightboxNavButton label="View previous photo" onClick={onPrevious} className="left-4">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </LightboxNavButton>
          <LightboxNavButton label="View next photo" onClick={onNext} className="right-4">
            <ChevronRight className="size-5" aria-hidden="true" />
          </LightboxNavButton>
        </div>
        <div className="flex items-end justify-between gap-6 p-6">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-ember uppercase">{collectionTitle}</span>
            <DialogTitle className="mt-2 text-xl font-semibold tracking-tight">{photo.title}</DialogTitle>
            <DialogDescription className="mt-1 text-cream/60">{photo.alt}</DialogDescription>
          </div>
          {total ? (
            <span className="shrink-0 font-mono text-sm text-cream/60 tabular-nums">
              {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PhotoLightbox

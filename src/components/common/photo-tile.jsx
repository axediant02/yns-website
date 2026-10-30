import { Expand } from 'lucide-react'

import { cn } from '@/lib/utils'

/** Clickable photo with a hover caption that opens the lightbox. */
function PhotoTile({ photo, label, onOpen, className, children }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={cn('group relative block size-full overflow-hidden rounded-2xl bg-sand text-left', className)}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-cream">
        <span className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
          <strong className="block text-sm font-semibold">{photo.title}</strong>
          {children}
        </span>
        <Expand className="size-4 shrink-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      </span>
    </button>
  )
}

export default PhotoTile

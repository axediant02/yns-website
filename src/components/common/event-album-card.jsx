import { ArrowUpRight, Images } from 'lucide-react'

import { cn } from '@/lib/utils'

/** Album preview: three stacked photos that fan out on hover or focus. */
function EventAlbumCard({ event, href, className }) {
  const previewPhotos = event.photos.slice(0, 3)

  return (
    <a
      href={href}
      aria-label={`Open ${event.title} photo album`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-ink/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_oklch(0.17_0.028_268/45%)] focus-visible:-translate-y-1',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-linear-to-br from-sand to-cream" aria-hidden="true">
        <div className="absolute inset-[14%_18%]">
          {previewPhotos.map((photo, index) => (
            <img
              key={photo.id}
              src={photo.src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`album-photo album-photo-${index + 1} absolute inset-0 size-full rounded-xl object-cover shadow-xl ring-4 ring-white`}
            />
          ))}
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
          <Images className="size-3.5" />
          {event.photos.length} photos
        </span>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 px-2 pt-5 pb-2">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.18em] text-dawn uppercase">{event.label}</span>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{event.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  )
}

export default EventAlbumCard

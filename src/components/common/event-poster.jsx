import emblemUrl from '@/assets/brand/yns-emblem.png'
import grainUrl from '@/assets/art/grain.svg'
import { cn } from '@/lib/utils'
import { eventDateBadge } from '@/utils/event-schedule'

const tones = {
  ember: 'from-ember via-dawn to-ink',
  dawn: 'from-dawn via-iris to-ink',
  iris: 'from-iris via-ink-soft to-ink',
}

/** Event poster, or branded placeholder art when no poster is available. */
function EventPoster({ event, className }) {
  const badge = eventDateBadge(event.startsAt)

  return (
    <div className={cn('relative aspect-[4/3] overflow-hidden md:aspect-[4/5] rounded-2xl bg-ink', className)}>
      {event.poster ? (
        <img src={event.poster.src} alt={event.poster.alt} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div aria-hidden="true" className={cn('absolute inset-0 bg-linear-to-br', tones[event.tone] ?? tones.ember)}>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: `url(${grainUrl})` }} />
          <div className="absolute -right-16 -bottom-16 size-64 rounded-full border border-white/20" />
          <div className="absolute -right-6 -bottom-6 size-40 rounded-full border border-white/15" />
          <img src={emblemUrl} alt="" decoding="async" className="absolute top-5 right-5 h-auto w-11 opacity-80 brightness-0 invert" />
          <p className="absolute bottom-5 left-5 max-w-[9ch] text-[1.75rem] leading-none font-semibold tracking-[-0.04em] text-white/90 sm:bottom-6 sm:left-6 sm:text-3xl">
            {event.kind}
          </p>
        </div>
      )}

      <span className="absolute top-4 left-4 grid min-w-14 place-items-center rounded-xl bg-cream px-2.5 py-2 text-center text-ink shadow-lg">
        {badge ? (
          <>
            <span className="text-[10px] font-semibold tracking-[0.18em] text-dawn uppercase">{badge.month}</span>
            <span className="text-xl leading-none font-semibold">{badge.day}</span>
          </>
        ) : (
          <span className="text-xs font-semibold tracking-[0.14em]">TBA</span>
        )}
      </span>
    </div>
  )
}

export default EventPoster

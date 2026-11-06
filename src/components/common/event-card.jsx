import { CalendarDays, MapPin } from 'lucide-react'

import EventPoster from '@/components/common/event-poster'
import { cn } from '@/lib/utils'
import { formatEventTime } from '@/utils/event-schedule'

/** Upcoming event summary: poster, kind, title, description, time, and place. */
function EventCard({ event, className }) {
  const isPlaceholder = event.status === 'placeholder'

  return (
    <article
      aria-labelledby={`${event.id}-title`}
      className={cn('group flex h-full flex-col rounded-3xl bg-white p-3 ring-1 ring-ink/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_oklch(0.17_0.028_268/45%)] motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}
    >
      <EventPoster event={event} />

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-dawn uppercase">{event.kind}</span>
          {isPlaceholder ? (
            <span className="rounded-full border border-dashed border-ink/20 px-2 py-0.5 text-[10px] font-medium text-ink/60">Placeholder</span>
          ) : null}
        </div>
        <h3 id={`${event.id}-title`} className="mt-2 text-xl font-semibold tracking-tight">{event.title}</h3>
        <p className="mt-2 mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>

        <dl className="mt-auto grid gap-2 border-t border-ink/10 pt-4 text-sm">
          <div className="flex items-start gap-2">
            <dt><CalendarDays className="mt-0.5 size-4 text-dawn" aria-hidden="true" /><span className="sr-only">When</span></dt>
            <dd>{formatEventTime(event.startsAt)}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt><MapPin className="mt-0.5 size-4 text-dawn" aria-hidden="true" /><span className="sr-only">Where</span></dt>
            <dd>{event.location || 'Location to be confirmed'}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default EventCard

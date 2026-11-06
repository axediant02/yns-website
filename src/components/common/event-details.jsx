import { CalendarDays, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatEventTime as eventTime } from '@/utils/event-schedule'

export default function EventDetails({ event }) {
  return (
    <Card id={event.previewId} className="events-coming-soon-card">
      <CardContent>
        <div className="events-coming-soon-icon" aria-hidden="true"><CalendarDays /></div>
        <div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p><CalendarDays aria-hidden="true" /> {eventTime(event.startsAt)}{event.endsAt ? ` – ${eventTime(event.endsAt)}` : ''} (Philippine time)</p>
          <p><MapPin aria-hidden="true" /> {event.location || 'Location to be confirmed'}</p>
        </div>
      </CardContent>
    </Card>
  )
}

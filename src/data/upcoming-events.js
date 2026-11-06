// Placeholder fixtures only. Fields mirror the CMS event record (title, description,
// startsAt, endsAt, location); the backend has no event poster field yet, so `poster`
// stays null and cards render branded placeholder art. Replace with published API data.
const placeholderEvent = {
  status: 'placeholder',
  title: 'Event to be announced',
  startsAt: null,
  endsAt: null,
  location: null,
  poster: null,
}

export const upcomingEvents = [
  {
    ...placeholderEvent,
    id: 'placeholder-event-1',
    kind: 'Gathering',
    tone: 'ember',
    description: 'Details for this gathering will be shared once they are confirmed by the community.',
  },
  {
    ...placeholderEvent,
    id: 'placeholder-event-2',
    kind: 'Camp',
    tone: 'dawn',
    description: 'Dates, venue, and registration information will appear here when they are ready.',
  },
  {
    ...placeholderEvent,
    id: 'placeholder-event-3',
    kind: 'Community moment',
    tone: 'iris',
    description: 'A shared moment for the YNS D6 community. More information is coming soon.',
  },
]

// Event times are entered as `YYYY-MM-DDTHH:mm` in Philippine time (contract: Asia/Manila).
const TIME_ZONE = 'Asia/Manila'

function parseEventTime(value) {
  if (!value) return null
  const date = new Date(`${value}+08:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatEventTime(value) {
  const date = parseEventTime(value)
  if (!date) return 'Date to be confirmed'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short', timeZone: TIME_ZONE }).format(date)
}

/** Month/day parts for a calendar badge, or null when the date is not yet confirmed. */
export function eventDateBadge(value) {
  const date = parseEventTime(value)
  if (!date) return null
  const part = (options) => new Intl.DateTimeFormat('en', { ...options, timeZone: TIME_ZONE }).format(date)
  return { month: part({ month: 'short' }), day: part({ day: 'numeric' }) }
}

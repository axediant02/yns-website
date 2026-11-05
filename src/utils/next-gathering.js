import { gatheringSchedule } from '@/constants/gathering-schedule'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

/**
 * Returns the current or next weekly gathering window relative to `now`.
 * Calculations run in the schedule's fixed UTC offset so the visitor's
 * own time zone does not shift the gathering.
 */
export function getNextGathering(now = new Date(), schedule = gatheringSchedule) {
  const offset = schedule.utcOffsetHours * HOUR
  const local = new Date(now.getTime() + offset)
  const daysSinceWeekday = (local.getUTCDay() - schedule.weekday + 7) % 7
  const weekStart = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() - daysSinceWeekday)

  let start = weekStart + schedule.startHour * HOUR
  let end = weekStart + schedule.endHour * HOUR

  if (local.getTime() >= end) {
    start += 7 * DAY
    end += 7 * DAY
  }

  return {
    start: new Date(start - offset),
    end: new Date(end - offset),
    isLive: local.getTime() >= start && local.getTime() < end,
  }
}

/** e.g. "Sunday, November 1 at 10:00 AM" in the gathering's own time zone. */
export function formatGatheringStart(date, schedule = gatheringSchedule) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: schedule.timeZone,
  })
  const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value }) => [type, value]))

  return `${parts.weekday}, ${parts.month} ${parts.day} at ${parts.hour}:${parts.minute} ${parts.dayPeriod}`
}

export function getCountdownParts(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

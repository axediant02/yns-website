import { gatheringSchedule } from '@/constants/gathering-schedule'
import useNextGathering from '@/hooks/use-next-gathering'
import { formatGatheringStart } from '@/utils/next-gathering'

const units = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
]

/** Live status of the next Sunday gathering, computed from the verified weekly schedule. */
function GatheringCountdown() {
  const { start, isLive, countdown } = useNextGathering()

  if (isLive) {
    return (
      <div className="flex items-center gap-3">
        <span className="pulse-dot relative size-3 rounded-full bg-ember" aria-hidden="true" />
        <p className="text-2xl font-semibold tracking-tight">Gathering is happening now</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-cream/60">
        Next gathering · <time dateTime={start.toISOString()}>{formatGatheringStart(start)}</time> ({gatheringSchedule.timeZoneLabel})
      </p>
      <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3" aria-hidden="true">
        {units.map(({ key, label }) => (
          <div key={key} className="rounded-2xl bg-white/[0.04] px-2 py-4 text-center ring-1 ring-white/10 sm:py-5">
            <span className="block font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-5xl">{String(countdown[key]).padStart(2, '0')}</span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.2em] text-cream/50 uppercase">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GatheringCountdown

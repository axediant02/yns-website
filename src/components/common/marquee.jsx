import { cn } from '@/lib/utils'

/** Infinite horizontal ticker. The duplicated half is hidden from assistive tech. */
function Marquee({ items, duration = 40, className, renderItem = (item) => item, paused = false, pauseOnHover = true, staticWhenReduced = false, label }) {
  const renderRow = (hidden) => (
    <ul
      className={cn('flex shrink-0 items-center', staticWhenReduced && (hidden ? 'motion-reduce:hidden' : 'motion-reduce:grid motion-reduce:w-full motion-reduce:grid-cols-1 sm:motion-reduce:grid-cols-2 lg:motion-reduce:grid-cols-3'))}
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {renderItem(item, { isCopy: hidden })}
        </li>
      ))}
    </ul>
  )

  return (
    <div data-pause-on-hover={pauseOnHover} className={cn('marquee overflow-hidden mask-x-from-90% mask-x-to-100%', className)}>
      <div className={cn('marquee-track flex w-max', staticWhenReduced && 'motion-reduce:w-full')} style={{ '--marquee-duration': `${duration}s`, animationPlayState: paused || items.length < 2 ? 'paused' : undefined }}>
        {renderRow(false)}
        {items.length > 1 ? renderRow(true) : null}
      </div>
    </div>
  )
}

export default Marquee

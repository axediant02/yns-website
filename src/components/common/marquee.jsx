import { cn } from '@/lib/utils'

/** Infinite horizontal ticker. The duplicated half is hidden from assistive tech. */
function Marquee({ items, duration = 40, className, renderItem = (item) => item }) {
  const renderRow = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cn('marquee overflow-hidden mask-x-from-90% mask-x-to-100%', className)}>
      <div className="marquee-track flex w-max" style={{ '--marquee-duration': `${duration}s` }}>
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  )
}

export default Marquee

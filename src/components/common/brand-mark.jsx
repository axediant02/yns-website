import emblemUrl from '@/assets/brand/yns-emblem.png'
import { cn } from '@/lib/utils'

/**
 * YNS emblem from the supplied logo (src/assets/logo-1.png), on a white disc
 * so its navy shapes stay visible on the dark header and footer.
 */
function BrandMark({ className }) {
  return (
    <span aria-hidden="true" className={cn('grid size-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-white/20', className)}>
      <img src={emblemUrl} alt="" width="28" height="24" decoding="async" className="h-auto w-7" />
    </span>
  )
}

export default BrandMark

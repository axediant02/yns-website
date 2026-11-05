import BrandMark from '@/components/common/brand-mark'
import { community } from '@/data/community'
import { cn } from '@/lib/utils'

function BrandLockup({ href = '/#top', onClick, className }) {
  return (
    <a href={href} onClick={onClick} className={cn('group inline-flex items-center gap-3 rounded-full', className)}>
      <BrandMark className="transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-tight">{community.shortName}</span>
        <span className="mt-1 block text-[10px] font-medium tracking-[0.18em] uppercase opacity-60">{community.location}</span>
      </span>
    </a>
  )
}

export default BrandLockup

import grainUrl from '@/assets/art/grain.svg'
import haloUrl from '@/assets/art/halo.svg'
import { cn } from '@/lib/utils'

/** Decorative animated light field used behind dark heroes. */
function AuroraBackdrop({ showHalo = false, haloClassName, className }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="aurora-blob aurora-blob-1 -top-1/4 left-[5%] size-[22rem] opacity-25 sm:size-[40rem]" />
      <div className="aurora-blob aurora-blob-2 top-[20%] -right-[10%] size-[20rem] opacity-30 sm:size-[34rem]" />
      <div className="aurora-blob aurora-blob-3 -bottom-1/3 left-[30%] size-[24rem] opacity-40 sm:size-[40rem]" />
      {showHalo ? (
        <div
          className={cn('absolute top-1/2 left-1/2 transition-transform duration-700 ease-out', haloClassName)}
          style={{ transform: 'translate3d(calc(-50% + var(--tilt-x, 0) * -28px), calc(-50% + var(--tilt-y, 0) * -28px), 0)' }}
        >
          <img src={haloUrl} alt="" className="halo-spin w-[min(115vw,60rem)] max-w-none opacity-60" />
        </div>
      ) : null}
      <div className="spotlight absolute inset-0" />
      <div className="grain absolute inset-0" style={{ '--grain-url': `url(${grainUrl})` }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink" />
    </div>
  )
}

export default AuroraBackdrop

import grainUrl from '@/assets/art/grain.svg'
import usePointerSpotlight from '@/hooks/use-pointer-spotlight'
import { cn } from '@/lib/utils'

const CORNERS = ['top-5 left-5 sm:top-7 sm:left-7', 'top-5 right-5 -scale-x-100 sm:top-7 sm:right-7', 'bottom-5 left-5 -scale-y-100 sm:bottom-7 sm:left-7', 'right-5 bottom-5 rotate-180 sm:right-7 sm:bottom-7']

function CornerFlourish({ className }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn('absolute size-9 text-gold/70 sm:size-12', className)}>
      <path d="M1 47V16C1 7.7 7.7 1 16 1h31" />
      <path d="M7 47V20c0-7.2 5.8-13 13-13h27" strokeOpacity="0.45" />
      <path d="M16 11l5 5-5 5-5-5z" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * Deep navy panel with a gold double hairline frame, corner flourishes,
 * a royal-purple glow, and a soft light that follows the pointer.
 */
function RoyalFrame({ className, children }) {
  const spotlightRef = usePointerSpotlight()

  return (
    <div ref={spotlightRef} className={cn('relative isolate overflow-clip rounded-[2.5rem] bg-ink text-cream shadow-[0_40px_120px_-40px_oklch(0.17_0.028_268/70%)]', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-56 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-iris/25 blur-3xl" />
        <div className="absolute -right-32 -bottom-56 size-[32rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="spotlight absolute inset-0" />
        <div className="grain absolute inset-0" style={{ '--grain-url': `url(${grainUrl})` }} />
        <div className="absolute inset-2.5 rounded-[2.1rem] border border-gold/35 sm:inset-3.5" />
        <div className="absolute inset-4 rounded-[1.8rem] border border-gold/15 sm:inset-5" />
        {CORNERS.map((corner) => <CornerFlourish key={corner} className={corner} />)}
      </div>
      {children}
    </div>
  )
}

export default RoyalFrame

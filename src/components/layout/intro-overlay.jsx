import haloUrl from '@/assets/art/halo.svg'
import { community } from '@/data/community'
import { INTRO_DURATION } from '@/hooks/use-intro'
import { cn } from '@/lib/utils'

const WORDMARK = ['Y', 'N', 'S', ' ', 'D', '6']

/** Once-per-session opening sequence: light rises, wordmark assembles, curtain lifts. */
function IntroOverlay({ phase, onSkip }) {
  if (phase === 'done') return null

  return (
    <div
      className={cn('fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink text-cream', phase === 'exiting' && 'intro-exit')}
      style={{ '--intro-duration': `${INTRO_DURATION}ms` }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="aurora-blob aurora-blob-1 size-[30rem] opacity-30" />
        <img src={haloUrl} alt="" className="intro-halo halo-spin absolute w-[min(130vw,46rem)] max-w-none" />
      </div>

      <div className="relative flex flex-col items-center text-center" aria-hidden="true">
        <span className="intro-fade text-[11px] font-semibold tracking-[0.4em] text-cream/60 uppercase" style={{ '--stage-delay': '150ms' }}>
          {community.location}
        </span>
        <span className="mt-6 flex overflow-hidden text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] font-semibold tracking-[-0.06em]">
          {WORDMARK.map((letter, index) => (
            <span key={index} className={cn('intro-letter', letter === ' ' && 'w-[0.25em]', index > 3 && 'text-dawn')} style={{ '--letter-index': index }}>
              {letter}
            </span>
          ))}
        </span>
        <span className="intro-fade mt-6 text-lg text-cream/80 sm:text-xl" style={{ '--stage-delay': '900ms' }}>
          Find your people. Follow Jesus.
        </span>
      </div>

      <div className="absolute inset-x-6 bottom-8 flex items-center gap-6 sm:inset-x-10">
        <div className="h-px flex-1 overflow-hidden bg-white/10" aria-hidden="true">
          <div className="intro-progress h-full bg-linear-to-r from-ember via-dawn to-iris" />
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full px-4 py-2 text-xs font-semibold tracking-[0.2em] text-cream/70 uppercase ring-1 ring-white/15 transition hover:bg-white/10 hover:text-cream"
        >
          Skip intro
        </button>
      </div>
    </div>
  )
}

export default IntroOverlay

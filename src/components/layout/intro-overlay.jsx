import grainUrl from '@/assets/art/grain.svg'
import haloUrl from '@/assets/art/halo.svg'
import { heroContent } from '@/constants/home-content'
import { community } from '@/data/community'
import { INTRO_DURATION } from '@/hooks/use-intro'
import { cn } from '@/lib/utils'

const WORDMARK = ['Y', 'N', 'S', ' ', 'D', '6']
const TAGLINE_DELAYS = ['2700ms', '2950ms']

function IntroEffects() {
  return (
    <div aria-hidden="true" className="intro-effects pointer-events-none absolute inset-0">
      <div className="intro-aurora absolute inset-0 grid place-items-center">
        <div className="aurora-blob aurora-blob-1 size-[30rem] opacity-30" />
        <div className="aurora-blob aurora-blob-3 size-[24rem] translate-x-1/3 translate-y-1/4 opacity-25" />
      </div>
      <div className="intro-flare" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="intro-halo">
          <img src={haloUrl} alt="" className="halo-spin w-[min(130vw,46rem)] max-w-none" />
        </div>
      </div>
      <span className="intro-spark" />
      <div className="grain absolute inset-0" style={{ '--grain-url': `url(${grainUrl})` }} />
    </div>
  )
}

function IntroStage() {
  return (
    <div aria-hidden="true" className="intro-zoom pointer-events-none absolute inset-0 grid place-items-center px-6">
      <div className="intro-stage flex flex-col items-center text-center">
        <span className="intro-tracking text-[11px] font-semibold tracking-[0.4em] text-cream/60 uppercase">{community.location}</span>
        <span className="mt-6 flex text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] font-semibold tracking-[-0.06em]">
          {WORDMARK.map((letter, index) => (
            <span key={index} className={cn('intro-letter', letter === ' ' && 'w-[0.25em]', index > 3 && 'text-dawn')} style={{ '--letter-index': index }}>
              {letter}
            </span>
          ))}
        </span>
        <span className="mt-8 text-xl font-medium tracking-tight sm:text-2xl">
          {heroContent.titleLines.map((line, index) => (
            <span key={line} className="intro-line" style={{ '--line-delay': TAGLINE_DELAYS[index] }}>
              <span className={index > 0 ? 'text-dawn' : 'text-cream/85'}>{line}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

/**
 * Once-per-session opening sequence. The skip control lives on the lower
 * curtain so it slides away with it when the curtain splits.
 */
function IntroOverlay({ phase, onSkip }) {
  if (phase === 'done') return null

  return (
    <div data-phase={phase} className="fixed inset-0 z-[100] overflow-hidden text-cream" style={{ '--intro-duration': `${INTRO_DURATION}ms` }}>
      <div className="intro-curtain intro-curtain-top" />
      <div className="intro-curtain intro-curtain-bottom">
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
      <IntroEffects />
      <IntroStage />
    </div>
  )
}

export default IntroOverlay

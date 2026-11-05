import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const pad = (value) => String(value).padStart(2, '0')
const ROUND = 'rounded-full border-gold-deep/30 bg-transparent text-ink hover:bg-ink hover:text-cream'

/** Counter plus pause/play and previous/next buttons for the verse spotlight. */
export function SpotlightControls({ index, count, isPlaying, canPlay, onTogglePlay, onPrevious, onNext }) {
  return (
    <div className="relative mt-12 flex items-center justify-between gap-4 border-t border-gold-deep/20 pt-6">
      <span className="font-mono text-sm text-ink/60">
        <span className="sr-only">Verse </span>{pad(index + 1)} <span aria-hidden="true">/</span><span className="sr-only">of</span> {pad(count)}
      </span>
      <div className="flex items-center gap-2">
        {canPlay ? (
          <Button variant="outline" size="icon-lg" className={ROUND} onClick={onTogglePlay} aria-label={isPlaying ? 'Pause verse rotation' : 'Play verse rotation'}>
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
        ) : null}
        <Button variant="outline" size="icon-lg" className={ROUND} onClick={onPrevious} aria-label="Previous verse" disabled={count < 2}>
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon-lg" className={ROUND} onClick={onNext} aria-label="Next verse" disabled={count < 2}>
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

/** Pill toggle used for theme filters and verse references. */
export function PillToggle({ isActive, onClick, children }) {
  return (
    <Button
      variant="outline"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        'h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors',
        isActive ? 'border-ink bg-ink text-cream hover:bg-ink hover:text-cream' : 'border-ink/15 bg-transparent text-ink/75 hover:bg-ink/5',
      )}
    >
      {children}
    </Button>
  )
}

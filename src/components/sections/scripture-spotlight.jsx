import { useState } from 'react'

import { PillToggle, SpotlightControls } from '@/components/sections/scripture-controls'
import { SCRIPTURE_VERSION, verses, verseThemes } from '@/constants/scripture'
import useAutoRotation from '@/hooks/use-auto-rotation'

const THEME_FILTERS = [{ id: 'all', label: 'All' }, ...verseThemes]
const themeLabels = Object.fromEntries(verseThemes.map((theme) => [theme.id, theme.label]))

/** Featured verse on a parchment card, with theme filters, reference chips, and gentle auto-rotation. */
function ScriptureSpotlight() {
  const [themeId, setThemeId] = useState('all')
  const list = themeId === 'all' ? verses : verses.filter((verse) => verse.theme === themeId)
  const { containerRef, holdProps, index, isPlaying, canPlay, goTo, next, previous, togglePlay } = useAutoRotation(list.length)
  const verse = list[index]

  const chooseTheme = (id) => {
    setThemeId(id)
    goTo(0)
  }

  return (
    <div ref={containerRef} {...holdProps} className="mt-16">
      <div role="group" aria-label="Filter verses by theme" className="flex flex-wrap gap-2">
        {THEME_FILTERS.map((theme) => (
          <PillToggle key={theme.id} isActive={theme.id === themeId} onClick={() => chooseTheme(theme.id)}>
            {theme.label}
          </PillToggle>
        ))}
      </div>

      <div className="relative mt-6 overflow-clip rounded-[2.5rem] bg-cream p-8 shadow-[0_40px_100px_-50px_oklch(0.17_0.028_268/45%)] ring-1 ring-gold-deep/25 sm:p-14 lg:p-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[2.1rem] border border-gold-deep/20 sm:inset-4" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-gold/20 blur-3xl" />
        <span aria-hidden="true" className="text-gold-foil pointer-events-none absolute top-2 left-6 font-serif text-[8rem] leading-none select-none sm:top-4 sm:left-10 sm:text-[12rem]">“</span>

        <div aria-live={isPlaying ? 'off' : 'polite'} className="relative min-h-[15rem] pt-16 sm:min-h-[17rem] sm:pt-20">
          <figure key={verse.id}>
            <p className="enter-fade text-[11px] font-semibold tracking-[0.35em] text-ink/60 uppercase">{themeLabels[verse.theme]}</p>
            <blockquote className="enter-fade mt-6 max-w-4xl font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.3] text-balance whitespace-pre-line text-ink" style={{ '--enter-delay': '80ms' }}>
              <p>{verse.text}</p>
            </blockquote>
            <figcaption className="enter-fade mt-8 flex items-center gap-3 text-sm font-semibold tracking-[0.25em] text-ink uppercase" style={{ '--enter-delay': '200ms' }}>
              <span aria-hidden="true" className="h-px w-10 bg-gold-deep/60" />
              {verse.reference}
              <span className="text-ink/60"><span aria-hidden="true">· </span>{SCRIPTURE_VERSION}</span>
            </figcaption>
          </figure>
        </div>

        <SpotlightControls
          index={index}
          count={list.length}
          isPlaying={isPlaying}
          canPlay={canPlay}
          onTogglePlay={togglePlay}
          onPrevious={previous}
          onNext={next}
        />
      </div>

      <ul aria-label="Choose a verse" className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {list.map((item, itemIndex) => (
          <li key={item.id}>
            <PillToggle isActive={itemIndex === index} onClick={() => goTo(itemIndex)}>
              {item.reference}
            </PillToggle>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScriptureSpotlight

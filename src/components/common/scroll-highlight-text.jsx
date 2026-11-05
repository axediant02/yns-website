import { Fragment } from 'react'

import useElementScrollProgress from '@/hooks/use-element-scroll-progress'
import { cn } from '@/lib/utils'

/** Paragraph whose words light up one after another as it scrolls into place. */
function ScrollHighlightText({ text, className }) {
  const elementRef = useElementScrollProgress()
  const words = text.split(' ')

  return (
    <p ref={elementRef} className={cn('text-balance', className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className="transition-opacity duration-200"
            style={{ opacity: `clamp(0.16, calc(var(--progress, 1) * ${words.length + 4} - ${index}), 1)` }}
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}

export default ScrollHighlightText

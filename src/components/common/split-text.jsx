import { Fragment } from 'react'

/**
 * Splits text into masked words that rise in sequence once an ancestor
 * has data-ready="true". Words stay in the accessible text flow.
 */
function SplitText({ text, startIndex = 0, delay = 0, className, wordClassName }) {
  const words = text.split(' ')

  return (
    <span className={className} style={{ '--split-delay': `${delay}ms` }}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="split-word">
            <span style={{ '--word-index': startIndex + index }}>
              {wordClassName ? <span className={wordClassName}>{word}</span> : word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}

export default SplitText

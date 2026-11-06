import { useState } from 'react'
import { UserRound } from 'lucide-react'

import { leadershipDetails } from '@/constants/leadership-content'

/** The parent keys this component by URL so a replacement photo gets a fresh load. */
function LeaderPortrait({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  function handleError() {
    setHasError(true)
    console.error('Leadership portrait could not be loaded', {
      feature: 'leadership', operation: 'load-portrait', code: 'IMAGE_LOAD_FAILED',
    })
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink-soft">
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          width="640"
          height="800"
          loading="lazy"
          decoding="async"
          onError={handleError}
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-linear-to-br from-gold/10 via-ink-soft to-ink px-5 text-center">
          <div aria-hidden="true" className="grid size-28 place-items-center rounded-full border border-gold/20 bg-gold/5">
            <UserRound className="size-12 text-gold/70" strokeWidth={1} />
          </div>
          <p className="text-sm text-cream/70" role={hasError ? 'status' : undefined}>
            {hasError ? leadershipDetails.portraitUnavailable : leadershipDetails.portraitPending}
          </p>
        </div>
      )}
    </div>
  )
}

export default LeaderPortrait

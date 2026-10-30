import { useId } from 'react'

import { cn } from '@/lib/utils'

/**
 * Temporary text-based mark. The official logo is pending approval
 * (docs/VERIFIED_CONTENT.md); replace this component when it is supplied.
 */
function BrandMark({ className }) {
  const gradientId = useId()

  return (
    <svg viewBox="0 0 48 48" className={cn('size-10', className)} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--ember)" />
          <stop offset="0.55" stopColor="var(--dawn)" />
          <stop offset="1" stopColor="var(--iris)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <text x="24" y="29" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="-0.8" fill="currentColor">D6</text>
    </svg>
  )
}

export default BrandMark

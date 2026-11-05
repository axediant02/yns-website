import { FilePenLine } from 'lucide-react'

import { cn } from '@/lib/utils'

const tones = {
  dark: 'border-ink/15 bg-ink/[0.03] text-ink/70',
  light: 'border-white/15 bg-white/[0.04] text-cream/70',
}

/** Marks placeholder content so it is not mistaken for verified information. */
function DraftNote({ tone = 'dark', className, children }) {
  return (
    <p className={cn('inline-flex items-start gap-2 rounded-xl border border-dashed px-3 py-2 text-xs leading-relaxed', tones[tone], className)}>
      <FilePenLine className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

export default DraftNote

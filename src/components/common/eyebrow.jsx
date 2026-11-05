import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const tones = {
  dark: 'border-ink/15 bg-ink/[0.04] text-ink',
  light: 'border-white/15 bg-white/[0.06] text-cream',
}

/** Small uppercase section label with a gradient marker. */
function Eyebrow({ tone = 'dark', className, children }) {
  return (
    <Badge
      variant="outline"
      className={cn('h-7 gap-2 rounded-full px-3 text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-sm', tones[tone], className)}
    >
      <span className="size-1.5 rounded-full bg-linear-to-r from-ember to-dawn" aria-hidden="true" />
      {children}
    </Badge>
  )
}

export default Eyebrow

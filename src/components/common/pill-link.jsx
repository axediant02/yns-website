import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const variants = {
  glow: 'bg-linear-to-r from-ember via-dawn to-iris text-ink shadow-[0_10px_40px_-10px_var(--dawn)] hover:shadow-[0_14px_50px_-8px_var(--dawn)] hover:brightness-105',
  ink: 'bg-ink text-cream hover:bg-ink-soft',
  cream: 'bg-cream text-ink hover:bg-white',
  ghostLight: 'bg-white/5 text-cream ring-1 ring-white/20 backdrop-blur hover:bg-white/10',
  ghostDark: 'bg-transparent text-ink ring-1 ring-ink/20 hover:bg-ink/5',
}

/**
 * Rounded call-to-action composed on the shadcn Button.
 * Pass `as` (e.g. ClientLink) to swap the anchor implementation.
 */
function PillLink({ href, variant = 'ink', icon: Icon = ArrowUpRight, as: Anchor = 'a', className, children, ...props }) {
  return (
    <Button
      asChild
      className={cn('group/pill h-12 gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300', variants[variant], className)}
    >
      <Anchor href={href} {...props}>
        {children}
        {Icon ? (
          <Icon className="size-4 transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5" aria-hidden="true" />
        ) : null}
      </Anchor>
    </Button>
  )
}

export default PillLink

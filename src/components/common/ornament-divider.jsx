import { cn } from '@/lib/utils'

/** Decorative gold hairlines meeting at a four-point star. */
function OrnamentDivider({ className }) {
  return (
    <div aria-hidden="true" className={cn('flex items-center gap-4 text-gold', className)}>
      <span className="h-px flex-1 bg-linear-to-r from-transparent via-gold/40 to-gold/70" />
      <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 drop-shadow-[0_0_6px_var(--gold)]">
        <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-linear-to-l from-transparent via-gold/40 to-gold/70" />
    </div>
  )
}

export default OrnamentDivider

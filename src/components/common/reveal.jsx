import useRevealOnScroll from '@/hooks/use-reveal-on-scroll'
import { cn } from '@/lib/utils'

/** Fades and lifts its children into view the first time they scroll on screen. */
function Reveal({ as: Component = 'div', delay = 0, className, style, children, ...props }) {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <Component
      ref={elementRef}
      data-visible={isVisible}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Reveal

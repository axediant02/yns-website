import { isPlainLeftClick, navigateTo } from '@/lib/site-route'

/** Anchor for same-origin path routes that navigates without a full reload. */
function ClientLink({ href, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (!isPlainLeftClick(event)) return

    event.preventDefault()
    navigateTo(href)
  }

  return <a href={href} onClick={handleClick} {...props} />
}

export default ClientLink

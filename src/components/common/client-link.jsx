import { navigateTo } from '@/lib/site-route'

function isPlainLeftClick(event) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

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

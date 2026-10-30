import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle of the viewport. */
function useActiveSection(ids, enabled = true) {
  const [activeId, setActiveId] = useState(null)
  const idsKey = ids.join('|')

  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    idsKey.split('|').forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [idsKey, enabled])

  return enabled ? activeId : null
}

export default useActiveSection

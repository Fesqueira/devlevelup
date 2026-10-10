import { useEffect, useState } from 'react'
import { HEADER_OFFSET } from '../lib/scroll'

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const getActive = () => {
      const scrollY = window.scrollY + HEADER_OFFSET
      let current: string | null = null

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue

        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= scrollY) current = id
      }

      return current
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setActiveId(getActive())
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return activeId
}

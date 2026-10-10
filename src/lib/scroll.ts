export const HEADER_OFFSET = 96

export function scrollToSection(href: string) {
  if (!href.startsWith('#')) return

  const target = document.getElementById(href.slice(1))
  if (!target) return

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

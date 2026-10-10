import type { NavLink } from '../../data/nav'
import { cn } from '../../lib/utils'

interface HeaderNavLinkProps {
  link: NavLink
  active: boolean
  onSelect: (href: string) => void
}

export function HeaderNavLink({ link, active, onSelect }: HeaderNavLinkProps) {
  return (
    <a
      href={link.href}
      onClick={(event) => {
        event.preventDefault()
        onSelect(link.href)
      }}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'relative font-sans text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-arcade-cyan after:transition-opacity',
        active
          ? 'text-arcade-cyan text-shadow-arcade-nav after:opacity-100'
          : 'text-arcade-nav-muted hover:text-arcade-cyan after:opacity-0',
      )}
    >
      {link.label}
    </a>
  )
}

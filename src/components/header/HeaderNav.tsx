import { navLinks } from '../../data/nav'
import { cn } from '../../lib/utils'
import { HeaderNavLink } from './HeaderNavLink'

interface HeaderNavProps {
  activeSection: string | null
  onSelect: (href: string) => void
  className?: string
}

export function HeaderNav({
  activeSection,
  onSelect,
  className,
}: HeaderNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn('hidden items-center gap-8 md:flex', className)}
    >
      {navLinks.map((link) => (
        <HeaderNavLink
          key={link.href}
          link={link}
          active={link.href.slice(1) === activeSection}
          onSelect={onSelect}
        />
      ))}
    </nav>
  )
}

import type { RefObject } from 'react'
import { navLinks } from '../../data/nav'
import { cn } from '../../lib/utils'
import { HeaderNavLink } from './HeaderNavLink'
import { SupportLink } from './SupportLink'

interface HeaderMobileMenuProps {
  activeSection: string | null
  menuRef: RefObject<HTMLElement | null>
  onNavigate: (href: string) => void
  onSupportClick: () => void
  className?: string
}

export function HeaderMobileMenu({
  activeSection,
  menuRef,
  onNavigate,
  onSupportClick,
  className,
}: HeaderMobileMenuProps) {
  return (
    <nav
      ref={menuRef}
      id="menu-mobile"
      aria-label="Menu móvel"
      className={cn(
        'border-t border-arcade-nav-border bg-arcade-navbar px-6 py-4 backdrop-blur md:hidden',
        className,
      )}
    >
      <ul className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            <HeaderNavLink
              link={link}
              active={link.href.slice(1) === activeSection}
              onSelect={onNavigate}
            />
          </li>
        ))}
        <li>
          <SupportLink variant="mobile" onClick={onSupportClick} />
        </li>
      </ul>
    </nav>
  )
}

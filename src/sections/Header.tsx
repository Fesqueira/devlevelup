import { useEffect, useMemo, useRef, useState } from 'react'
import { HeaderActions } from '../components/header/HeaderActions'
import { HeaderLogo } from '../components/header/HeaderLogo'
import { HeaderMobileMenu } from '../components/header/HeaderMobileMenu'
import { HeaderNav } from '../components/header/HeaderNav'
import { navLinks } from '../data/nav'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection } from '../lib/scroll'
import { cn } from '../lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.slice(1)),
    [],
  )
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) return

    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  const handleMobileNavClick = (href: string) => {
    closeMenu()
    requestAnimationFrame(() => scrollToSection(href))
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-arcade-nav-border bg-arcade-navbar backdrop-blur',
        className,
      )}
    >
      <div className="flex h-18 items-center justify-between gap-6 px-6 sm:px-10 lg:px-20">
        <HeaderLogo />
        <HeaderNav activeSection={activeSection} onSelect={scrollToSection} />
        <HeaderActions
          menuOpen={menuOpen}
          toggleRef={toggleRef}
          onToggle={() => setMenuOpen((open) => !open)}
        />
      </div>

      {menuOpen && (
        <HeaderMobileMenu
          activeSection={activeSection}
          menuRef={menuRef}
          onNavigate={handleMobileNavClick}
          onSupportClick={closeMenu}
        />
      )}
    </header>
  )
}

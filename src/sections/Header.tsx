import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CloseIcon,
  MenuIcon,
  SouJuniorMark,
  SouJuniorWordmark,
} from '../components/ui/icons'
import { Mascot } from '../components/ui/Mascot'
import { siteConfig } from '../config'
import { navLinks } from '../data/nav'
import { useActiveSection } from '../hooks/useActiveSection'
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
    if (!href.startsWith('#')) return

    const id = href.slice(1)
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      target?.scrollIntoView({ behavior: 'smooth' })
      target?.focus({ preventScroll: true })
    })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-arcade-nav-border bg-arcade-navbar backdrop-blur',
        className,
      )}
    >
      <div className="flex h-18 items-center justify-between gap-6 px-6 sm:px-10 lg:px-20">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label="SouJunior — início"
        >
          <span className="flex items-center gap-3">
            <SouJuniorMark className="size-9 text-arcade-white" />
            <SouJuniorWordmark className="h-4.25 w-auto text-arcade-white" />
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => {
            const isActive = link.href.slice(1) === activeSection
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative font-sans text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-arcade-cyan after:transition-opacity',
                  isActive
                    ? 'text-arcade-cyan text-shadow-arcade-nav after:opacity-100'
                    : 'text-arcade-nav-muted hover:text-arcade-cyan after:opacity-0',
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Mascot loading="eager" className="hidden sm:block" />
          <a
            href={siteConfig.links.apoia}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center rounded-lg bg-arcade-cyan px-3 font-sans text-sm font-semibold text-arcade-950 shadow-arcade-badge transition-colors hover:bg-arcade-secondary md:inline-flex md:px-5 md:py-2.5"
          >
            {'Apoiar a partir de R$ 2,00'}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-arcade-ghost transition-colors hover:text-arcade-cyan md:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <nav
        ref={menuRef}
        id="menu-mobile"
        className={cn(
          'border-t border-arcade-nav-border bg-arcade-navbar px-6 py-4 backdrop-blur md:hidden',
          !menuOpen && 'hidden',
        )}
        aria-label="Menu móvel"
      >
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = link.href.slice(1) === activeSection
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleMobileNavClick(link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative font-sans text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-arcade-cyan after:transition-opacity',
                    isActive
                      ? 'text-arcade-cyan text-shadow-arcade-nav after:opacity-100'
                      : 'text-arcade-nav-muted hover:text-arcade-cyan after:opacity-0',
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li>
            <a
              href={siteConfig.links.apoia}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="inline-flex h-10 items-center rounded-lg bg-arcade-cyan px-3 font-sans text-sm font-semibold text-arcade-950 shadow-arcade-badge transition-colors hover:bg-arcade-secondary"
            >
              <span className="sm:hidden">{'Apoiar'}</span>
              <span className="hidden sm:inline">
                {'Apoiar a partir de R$ 2,00'}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

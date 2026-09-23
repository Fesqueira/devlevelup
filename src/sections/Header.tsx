import { useState } from 'react'
import { Mascot } from '../components/ui/Mascot'
import {
  CloseIcon,
  MenuIcon,
  SouJuniorMark,
  SouJuniorWordmark,
} from '../components/ui/icons'
import { siteConfig } from '../config'
import { navLinks } from '../data/nav'
import { cn } from '../lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-arcade-nav-border bg-arcade-navbar backdrop-blur',
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
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'font-sans text-sm font-medium transition-colors',
                index === 0
                  ? 'text-arcade-cyan text-shadow-arcade-nav'
                  : 'text-arcade-nav-muted hover:text-arcade-cyan',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Mascot
            alt="Mascote SouJunior"
            loading="eager"
            className="hidden sm:block"
          />
          <a
            href={siteConfig.links.apoia}
            className="inline-flex h-10 items-center rounded-lg bg-arcade-cyan px-3 font-sans text-sm font-semibold text-arcade-950 shadow-arcade-badge transition-colors hover:bg-arcade-secondary sm:h-auto sm:px-5 sm:py-2.5"
          >
            <span className="sm:hidden">{'Apoiar'}</span>
            <span className="hidden sm:inline">
              {'Apoiar a partir de R$ 2,00'}
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
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

      {menuOpen && (
        <nav
          className="border-t border-arcade-nav-border bg-arcade-navbar px-6 py-4 backdrop-blur md:hidden"
          aria-label="Menu móvel"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'font-sans text-sm font-medium transition-colors',
                    index === 0
                      ? 'text-arcade-cyan text-shadow-arcade-nav'
                      : 'text-arcade-nav-muted hover:text-arcade-cyan',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

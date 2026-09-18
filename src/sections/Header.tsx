import { useState } from 'react'
import { CloseIcon, MenuIcon } from '../components/ui/icons'
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
        'sticky top-0 z-50 border-b border-arcade-outline bg-arcade-surface',
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between gap-6 px-4 sm:h-17 sm:px-8 lg:px-16">
        <a href="#" className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-arcade-m3-primary bg-arcade-surface-variant font-sans text-base font-extrabold leading-none text-arcade-m3-primary sm:h-9 sm:w-9 sm:rounded-lg sm:border-2 sm:text-xl">
            {'SJ'}
          </span>
          <span className="font-sans text-base font-bold text-arcade-on-surface sm:text-xl">
            {'SouJunior'}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-arcade-on-surface-variant transition-colors hover:text-arcade-m3-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.links.apoia}
            className="inline-flex h-10 items-center rounded-full bg-arcade-m3-primary px-4 font-sans text-xs font-semibold text-arcade-surface transition-colors hover:bg-arcade-m3-primary/90 sm:h-auto sm:px-6 sm:py-3 sm:text-sm"
          >
            {'Apoiar'}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-arcade-on-surface transition-colors hover:bg-arcade-surface-variant md:hidden"
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
        <nav className="border-t border-arcade-outline bg-arcade-surface px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm font-medium text-arcade-on-surface-variant transition-colors hover:text-arcade-m3-primary"
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

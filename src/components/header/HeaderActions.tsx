import type { RefObject } from 'react'
import { CloseIcon, MenuIcon } from '../ui/icons'
import { Mascot } from '../ui/Mascot'
import { cn } from '../../lib/utils'
import { SupportLink } from './SupportLink'

interface HeaderActionsProps {
  menuOpen: boolean
  onToggle: () => void
  toggleRef: RefObject<HTMLButtonElement | null>
  className?: string
}

export function HeaderActions({
  menuOpen,
  onToggle,
  toggleRef,
  className,
}: HeaderActionsProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Mascot loading="eager" className="hidden sm:block" />
      <SupportLink variant="desktop" />
      <button
        ref={toggleRef}
        type="button"
        onClick={onToggle}
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
  )
}

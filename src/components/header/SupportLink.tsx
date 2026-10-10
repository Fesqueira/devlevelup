import type { ReactNode } from 'react'
import { siteConfig } from '../../config'
import { cn } from '../../lib/utils'

type SupportLinkVariant = 'desktop' | 'mobile'

interface SupportLinkProps {
  variant?: SupportLinkVariant
  onClick?: () => void
}

const base =
  'h-10 items-center rounded-lg bg-arcade-cyan font-sans text-sm font-semibold text-arcade-950 shadow-arcade-badge transition-colors hover:bg-arcade-secondary'

const variants: Record<
  SupportLinkVariant,
  { className: string; label: ReactNode }
> = {
  desktop: {
    className: 'hidden md:inline-flex md:px-5 md:py-2.5',
    label: 'Apoie a partir de R$ 2',
  },
  mobile: {
    className: 'inline-flex px-3',
    label: (
      <>
        <span className="sm:hidden">Apoiar</span>
        <span className="hidden sm:inline">Apoiar a partir de R$ 2,00</span>
      </>
    ),
  },
}

export function SupportLink({
  variant = 'desktop',
  onClick,
}: SupportLinkProps) {
  return (
    <a
      href={siteConfig.links.apoia}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={cn(base, variants[variant].className)}
    >
      {variants[variant].label}
    </a>
  )
}

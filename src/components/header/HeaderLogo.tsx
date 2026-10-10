import { SouJuniorMark, SouJuniorWordmark } from '../ui/icons'
import { cn } from '../../lib/utils'

interface HeaderLogoProps {
  className?: string
}

export function HeaderLogo({ className }: HeaderLogoProps) {
  return (
    <a
      href="#"
      aria-label="SouJunior — início"
      className={cn('flex items-center gap-3', className)}
    >
      <span className="flex items-center gap-3">
        <SouJuniorMark className="size-9 text-arcade-white" />
        <SouJuniorWordmark className="h-4.25 w-auto text-arcade-white" />
      </span>
    </a>
  )
}

import type { SquadRole } from '../../data/squad'
import { cn } from '../../lib/utils'

interface SquadCardProps {
  role: SquadRole
  className?: string
}

export function SquadCard({ role, className }: SquadCardProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex flex-col items-center gap-1.5">
        <span className="flex h-7 items-center justify-center whitespace-nowrap rounded border border-arcade-cyan-badge-border bg-arcade-level px-4 font-pixel text-[11px] leading-none text-arcade-cyan shadow-arcade-glow">
          {role.label}
        </span>
        <span
          aria-hidden="true"
          className="size-2.25 rotate-45 border border-arcade-cyan-badge-border bg-arcade-level"
        />
      </div>
      <div className="relative mt-4">
        <img
          src={role.image}
          alt={role.name}
          className="size-40 object-contain"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 h-7 w-35 -translate-x-1/2 rounded-[50%] bg-arcade-950/55 blur-[5px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-1.5 left-1/2 h-4 w-20 -translate-x-1/2 rounded-[50%] bg-arcade-950/35 blur-[2.5px]"
        />
      </div>
    </div>
  )
}

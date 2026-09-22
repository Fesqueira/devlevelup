import type { SquadRole } from '../../data/squad'
import { cn } from '../../lib/utils'

interface SquadCardProps {
  role: SquadRole
  className?: string
}

export function SquadCard({ role, className }: SquadCardProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex flex-col items-center gap-1">
        <span className="flex h-[23px] items-center justify-center whitespace-nowrap rounded border border-arcade-cyan-badge-border bg-arcade-level px-3.5 font-pixel text-[9px] leading-none text-arcade-cyan shadow-arcade-glow">
          {role.label}
        </span>
        <span
          aria-hidden="true"
          className="size-[7px] rotate-45 border border-arcade-cyan-badge-border bg-arcade-level"
        />
      </div>
      <div className="relative mt-3">
        <img
          src={role.image}
          alt={role.name}
          className="size-32 object-contain"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-3 left-1/2 h-[22px] w-[110px] -translate-x-1/2 rounded-[50%] bg-arcade-950/55 blur-[5px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 h-3 w-[60px] -translate-x-1/2 rounded-[50%] bg-arcade-950/35 blur-[2.5px]"
        />
      </div>
    </div>
  )
}

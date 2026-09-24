import type { SquadRole } from '../../data/squad'
import { useId } from 'react'
import { SquadAvatar } from './SquadAvatar'
import { SquadTooltip } from './SquadTooltip'
import { cn } from '../../lib/utils'

interface SquadCardProps {
  role: SquadRole
  floatDelay?: number
  className?: string
}

export function SquadCard({ role, floatDelay = 0, className }: SquadCardProps) {
  const tooltipId = useId()

  return (
    <div
      tabIndex={0}
      aria-describedby={tooltipId}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center outline-none',
        className,
      )}
    >
      <SquadTooltip
        id={tooltipId}
        title={role.label}
        items={role.skills}
        className="hidden group-hover:block group-focus-visible:block"
      />
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
        <div
          className="animate-sprite-float drop-shadow-arcade-sprite transition-[filter] duration-200 ease-out group-hover:drop-shadow-arcade-sprite-hover group-focus-visible:drop-shadow-arcade-sprite-hover motion-reduce:animate-none"
          style={{ animationDelay: `${floatDelay}s` }}
        >
          <SquadAvatar
            frames={role.frames}
            alt={role.name}
            className="size-28 sm:size-40"
          />
        </div>
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

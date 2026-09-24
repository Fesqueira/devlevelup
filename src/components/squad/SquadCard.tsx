import type { CSSProperties } from 'react'
import { useId } from 'react'
import type { SquadRole } from '../../data/squad'
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
      style={{ '--squad-accent': role.accent } as CSSProperties}
    >
      <SquadTooltip
        id={tooltipId}
        title={role.label}
        items={role.skills}
        className="hidden group-hover:block group-focus-visible:block"
      />
      <div className="flex flex-col items-center">
        <span className="mb-1.5 whitespace-nowrap rounded border border-(--squad-accent) bg-arcade-footer/88 px-2.5 py-1.25 font-pixel text-[9px] tracking-[0.04em] text-(--squad-accent) transition duration-200 ease-out group-hover:bg-(--squad-accent) group-hover:text-arcade-footer group-hover:shadow-[0_0_14px_color-mix(in_srgb,var(--squad-accent)_40%,transparent)] group-focus-visible:bg-(--squad-accent) group-focus-visible:text-arcade-footer group-focus-visible:shadow-[0_0_14px_color-mix(in_srgb,var(--squad-accent)_40%,transparent)]">
          {role.label}
        </span>
        <span
          aria-hidden="true"
          className="mb-1 size-0 border-x-5 border-t-7 border-x-transparent border-t-(--squad-accent) transition duration-200 ease-out group-hover:drop-shadow-[0_0_4px_var(--squad-accent)] group-focus-visible:drop-shadow-[0_0_4px_var(--squad-accent)]"
        />
      </div>
      <div className="relative mt-4">
        <div
          className="animate-sprite-float drop-shadow-arcade-sprite transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_0_18px_color-mix(in_srgb,var(--squad-accent)_53%,transparent)] group-focus-visible:drop-shadow-[0_0_18px_color-mix(in_srgb,var(--squad-accent)_53%,transparent)] motion-reduce:animate-none"
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

import type { LevelData } from '../../data/levelup'
import { cn } from '../../lib/utils'

interface LevelNodeProps {
  level: LevelData
  className?: string
}

export function LevelNode({ level, className }: LevelNodeProps) {
  return (
    <div
      className={cn(
        'flex h-7 w-14 shrink-0 items-center justify-center rounded-lg border font-inter text-xs font-bold',
        level.current
          ? 'border-arcade-cyan bg-arcade-cyan-icon text-arcade-cyan shadow-arcade-card-glow'
          : level.locked
            ? 'border-arcade-icon-border bg-arcade-comparison-card text-arcade-muted'
            : 'border-arcade-cyan-badge-border bg-arcade-cyan-badge text-arcade-cyan',
        className,
      )}
    >
      {level.level}
    </div>
  )
}

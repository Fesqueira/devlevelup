import type { LevelData } from '../../data/levelup'
import { LockIcon } from '../ui/icons'
import { cn } from '../../lib/utils'

interface LevelNodeProps {
  level: LevelData
  className?: string
}

export function LevelNode({ level, className }: LevelNodeProps) {
  return (
    <div
      className={cn(
        'flex size-20 shrink-0 items-center justify-center rounded-full border-2 font-inter text-sm font-bold',
        level.current
          ? 'border-arcade-cyan bg-arcade-cyan-icon text-arcade-cyan shadow-arcade-card-glow'
          : level.locked
            ? 'border-arcade-icon-border bg-arcade-comparison-card text-arcade-muted'
            : 'border-arcade-cyan-badge-border bg-arcade-cyan-badge text-arcade-cyan',
        className,
      )}
    >
      {level.locked ? <LockIcon className="size-6" /> : level.level}
    </div>
  )
}

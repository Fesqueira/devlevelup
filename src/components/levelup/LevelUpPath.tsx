import { Fragment } from 'react'
import { levelUpCopy } from '../../data/levelup'
import { BoltIcon, LockIcon } from '../ui/icons'
import { LevelNode } from './LevelNode'
import { cn } from '../../lib/utils'

interface LevelUpPathProps {
  className?: string
}

export function LevelUpPath({ className }: LevelUpPathProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <ol className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-between">
        {levelUpCopy.levels.map((level, index) => (
          <Fragment key={level.level}>
            <li
              className={cn(
                'relative flex w-full max-w-64 flex-col items-center gap-4 rounded-2xl border p-6 text-center lg:flex-1',
                level.current
                  ? 'border-arcade-cyan bg-arcade-comparison-card-active shadow-arcade-card-glow'
                  : 'border-arcade-card-border bg-arcade-comparison-card',
              )}
            >
              <div className="relative flex items-center justify-center">
                <div className="rounded-xl bg-arcade-level-frame p-2">
                  <img
                    src={level.image}
                    alt={level.name}
                    loading="lazy"
                    className={cn(
                      'size-44 object-contain',
                      level.locked && 'opacity-40 saturate-50',
                    )}
                  />
                </div>
                {level.locked && (
                  <div className="absolute -top-8 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-arcade-icon-border bg-arcade-comparison-card text-arcade-muted">
                    <LockIcon className="size-4" />
                  </div>
                )}
              </div>
              <LevelNode level={level} />
              <div className="flex flex-col gap-1">
                <p className="font-inter text-base font-bold text-arcade-white">
                  {level.name}
                </p>
                <p className="font-inter text-xs leading-4 text-arcade-text-secondary">
                  {level.description}
                </p>
              </div>
              {level.current && (
                <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wider text-arcade-cyan">
                  {levelUpCopy.currentLabel}
                </span>
              )}
            </li>
            {index < levelUpCopy.levels.length - 1 && (
              <li className="flex items-center justify-center lg:items-start lg:self-start lg:pt-28">
                <span className="flex items-center gap-1 rounded-full bg-arcade-cyan-badge px-2 py-1 font-inter text-[10px] font-bold text-arcade-cyan">
                  <BoltIcon className="size-3" />
                  {levelUpCopy.xpLabel}
                </span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

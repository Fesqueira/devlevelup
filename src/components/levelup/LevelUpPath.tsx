import { Fragment } from 'react'
import { levelUpCopy } from '../../data/levelup'
import { ArrowRightIcon, BoltIcon, LockIcon } from '../ui/icons'
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
                'relative flex w-full max-w-64 flex-col items-center gap-4 overflow-hidden rounded-2xl border p-6 text-center lg:flex-1',
                level.current
                  ? 'border-arcade-cyan bg-arcade-comparison-card-active shadow-arcade-card-glow'
                  : 'border-arcade-card-border bg-arcade-comparison-card',
              )}
            >
              {level.locked && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-arcade-level/60"
                />
              )}
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
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-arcade-level/80 text-arcade-cyan shadow-arcade-badge">
                      <LockIcon className="size-6" />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <LevelNode level={level} />
                {level.current && (
                  <span className="rounded-full border border-arcade-neon bg-arcade-neon/10 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wider text-arcade-neon">
                    {levelUpCopy.currentLabel}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-inter text-base font-bold text-arcade-white">
                  {level.name}
                </p>
                <p className="font-inter text-xs leading-4 text-arcade-text-secondary">
                  {level.description}
                </p>
              </div>
            </li>
            {index < levelUpCopy.levels.length - 1 && (
              <li className="flex items-center justify-center lg:w-24 lg:self-center">
                <div className="flex w-full items-center gap-2">
                  <span className="hidden h-px flex-1 bg-linear-to-r from-arcade-cyan to-arcade-yellow lg:block" />
                  <span className="flex items-center gap-1 rounded-full bg-arcade-cyan-badge px-2 py-1 font-inter text-[10px] font-bold text-arcade-cyan">
                    <BoltIcon className="size-3" />
                    {levelUpCopy.xpLabel}
                    <ArrowRightIcon className="size-3" />
                  </span>
                  <span className="hidden h-px flex-1 bg-linear-to-r from-arcade-yellow to-arcade-cyan lg:block" />
                </div>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

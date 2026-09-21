import { Fragment } from 'react'
import { levelUpCopy } from '../../data/levelup'
import { BoltIcon } from '../ui/icons'
import { LevelNode } from './LevelNode'
import { cn } from '../../lib/utils'

interface LevelUpPathProps {
  className?: string
}

export function LevelUpPath({ className }: LevelUpPathProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 hidden h-0.5 bg-arcade-divider lg:block"
      />

      <ol className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        {levelUpCopy.levels.map((level, index) => (
          <Fragment key={level.level}>
            <li className="flex w-full max-w-56 flex-col items-center gap-4 text-center lg:w-auto lg:flex-1">
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
              <li className="flex items-center justify-center lg:items-start lg:pt-8">
                <span className="flex items-center gap-1 rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-2 py-1 font-inter text-[10px] font-bold text-arcade-cyan">
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

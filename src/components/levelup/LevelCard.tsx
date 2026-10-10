import type { Ref } from 'react'
import type { LevelData } from '../../data/levelup'
import { levelUpCopy } from '../../data/levelup'
import { cn } from '../../lib/utils'
import { LevelCardVisual } from './LevelCardVisual'
import { LevelNode } from './LevelNode'

interface LevelCardProps {
  level: LevelData
  unlocked: boolean
  current: boolean
  reduceMotion: boolean
  ref?: Ref<HTMLLIElement>
  className?: string
}

export function LevelCard({
  level,
  unlocked,
  current,
  reduceMotion,
  ref,
  className,
}: LevelCardProps) {
  return (
    <li
      ref={ref}
      inert={!unlocked}
      aria-hidden={!unlocked}
      className={cn(
        'relative flex w-[62vw] max-w-64 shrink-0 snap-center flex-col items-center gap-4 overflow-hidden rounded-2xl border p-6 text-center transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 motion-reduce:transform-none lg:w-52 lg:flex-none',
        current
          ? 'border-arcade-cyan bg-arcade-comparison-card-active shadow-arcade-card-glow hover:border-arcade-purple-glow hover:shadow-arcade-tier-featured'
          : 'border-arcade-card-border bg-arcade-comparison-card hover:border-arcade-cyan/60 hover:shadow-arcade-card-glow',
        className,
      )}
    >
      {!unlocked && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-arcade-level/60"
        />
      )}

      <LevelCardVisual
        level={level}
        unlocked={unlocked}
        reduceMotion={reduceMotion}
      />

      <div className="flex items-center gap-2">
        <LevelNode label={level.level} unlocked={unlocked} current={current} />
        {current && (
          <span className="rounded-full border border-arcade-neon bg-arcade-neon/10 px-3 py-1 font-sora text-[10px] font-semibold uppercase tracking-wider text-arcade-neon">
            {levelUpCopy.currentLabel}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-sans text-base font-bold text-arcade-white">
          {level.name}
        </p>
        <p className="font-sans text-xs leading-4 text-arcade-text-secondary">
          {level.description}
        </p>
      </div>
    </li>
  )
}

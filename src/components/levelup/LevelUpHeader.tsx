import { levelUpCopy } from '../../data/levelup'
import { cn } from '../../lib/utils'

interface LevelUpHeaderProps {
  className?: string
}

export function LevelUpHeader({ className }: LevelUpHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-4 py-1.5 font-inter text-xs font-semibold uppercase tracking-wider text-arcade-cyan">
        {levelUpCopy.badge}
      </span>
      <div className="flex flex-col items-center gap-1">
        <p className="font-inter text-sm font-medium text-arcade-text-secondary">
          {levelUpCopy.subtitle}
        </p>
        <h2 className="font-inter text-2xl font-bold leading-10 text-arcade-white sm:text-3xl lg:text-[32px]">
          {levelUpCopy.title}
        </h2>
      </div>
      <p className="max-w-160 text-center font-roboto-flex text-base font-medium leading-6 text-arcade-footer-text">
        {levelUpCopy.description}
      </p>
    </div>
  )
}

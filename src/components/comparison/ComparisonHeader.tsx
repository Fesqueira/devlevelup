import { comparisonCopy } from '../../data/comparison'
import { cn } from '../../lib/utils'

interface ComparisonHeaderProps {
  className?: string
}

export function ComparisonHeader({ className }: ComparisonHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-4 py-1.5 font-inter text-xs font-semibold uppercase tracking-wider text-arcade-cyan">
        {comparisonCopy.badge}
      </span>
      <h2 className="font-inter text-2xl font-bold leading-10 text-arcade-white sm:text-3xl lg:text-[32px]">
        {comparisonCopy.title}
      </h2>
      <p className="max-w-160 text-center font-roboto-flex text-base font-medium leading-6 text-arcade-footer-text">
        {comparisonCopy.description}
      </p>
    </div>
  )
}

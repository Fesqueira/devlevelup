import { ComparisonCard } from '../components/comparison/ComparisonCard'
import { ComparisonCta } from '../components/comparison/ComparisonCta'
import { SectionHeader } from '../components/ui/SectionHeader'
import { comparisonCopy } from '../data/comparison'
import { cn } from '../lib/utils'

interface ComparisonProps {
  className?: string
}

export function Comparison({ className }: ComparisonProps) {
  return (
    <section
      className={cn(
        'relative flex flex-col items-center gap-14 overflow-hidden bg-arcade-footer px-6 py-16 lg:px-20 lg:py-24',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-40 size-[500px] rounded-full bg-arcade-cyan opacity-10 blur-[75px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-64 size-[500px] rounded-full bg-arcade-purple-glow opacity-10 blur-[75px]"
      />
      <img
        src="/images/grid-texture.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <SectionHeader
        badge={comparisonCopy.badge}
        title={comparisonCopy.title}
        description={comparisonCopy.description}
      />

      <div className="relative flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-center">
        <ComparisonCard
          variant="isolated"
          {...comparisonCopy.isolated}
          className="w-full lg:max-w-160 lg:flex-1"
        />
        <ComparisonCard
          variant="ecosystem"
          {...comparisonCopy.ecosystem}
          className="w-full lg:max-w-160 lg:flex-1"
        />
      </div>

      <ComparisonCta />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

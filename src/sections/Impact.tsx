import { ImpactCard } from '../components/impact/ImpactCard'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { impactCopy } from '../data/impact'
import { cn } from '../lib/utils'

interface ImpactProps {
  className?: string
}

export function Impact({ className }: ImpactProps) {
  return (
    <Reveal>
      <section
        id="impacto"
        className={cn(
          'relative flex flex-col items-center gap-14 overflow-hidden bg-arcade-background px-6 py-16 lg:px-20 lg:py-30',
          className,
        )}
      >
        <SectionHeader
          badge={impactCopy.badge}
          title={impactCopy.title}
          subtitle={impactCopy.subtitle}
        />

        <div className="relative flex w-full max-w-270 flex-col items-center gap-6 lg:flex-row lg:justify-center">
          {impactCopy.stats.map((stat) => (
            <ImpactCard
              key={stat.title}
              value={stat.value}
              title={stat.title}
              description={stat.description}
              className="w-full lg:flex-1"
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
        />
      </section>
    </Reveal>
  )
}

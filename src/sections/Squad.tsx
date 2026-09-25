import { SquadPlatform } from '../components/squad/SquadPlatform'
import { SquadGlows } from '../components/squad/SquadGlows'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Starfield } from '../components/ui/Starfield'
import { squadCopy } from '../data/squad'
import { cn } from '../lib/utils'

interface SquadProps {
  className?: string
}

export function Squad({ className }: SquadProps) {
  return (
    <Reveal>
      <section
        id="squads"
        className={cn(
          'relative flex flex-col items-center gap-16 overflow-hidden bg-arcade-footer px-6 py-20 lg:px-20 lg:py-30',
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-132 bg-[radial-gradient(50%_50%_at_50%_20%,var(--color-arcade-900)_0%,var(--color-arcade-footer)_70%,var(--color-arcade-footer)_100%)]"
        />
        <SquadGlows />

        <Starfield />

        <SectionHeader
          badge={squadCopy.badge}
          subtitle={squadCopy.subtitle}
          title={squadCopy.title}
          description={squadCopy.description}
          className="relative z-10"
        />

        <div className="relative z-10 mt-24 flex w-full max-w-300 flex-col items-center">
          <SquadPlatform roles={squadCopy.roles} className="z-10" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
        />
      </section>
    </Reveal>
  )
}

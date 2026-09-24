import { LevelUpPath } from '../components/levelup/LevelUpPath'
import { SquadGlows } from '../components/squad/SquadGlows'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Starfield } from '../components/ui/Starfield'
import { levelUpCopy } from '../data/levelup'
import { cn } from '../lib/utils'

interface LevelUpProps {
  className?: string
}

export function LevelUp({ className }: LevelUpProps) {
  return (
    <section
      id="jornada"
      tabIndex={-1}
      className={cn(
        'relative flex flex-col items-center gap-14 overflow-hidden bg-arcade-footer px-6 py-16 focus:outline-none lg:px-20 lg:py-30',
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
        badge={levelUpCopy.badge}
        subtitle={levelUpCopy.subtitle}
        title={levelUpCopy.title}
        description={levelUpCopy.description}
        className="relative z-10"
      />

      <LevelUpPath className="relative z-10 w-full" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

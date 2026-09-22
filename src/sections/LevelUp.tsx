import { LevelUpPath } from '../components/levelup/LevelUpPath'
import { SectionHeader } from '../components/ui/SectionHeader'
import { levelUpCopy } from '../data/levelup'
import { cn } from '../lib/utils'

interface LevelUpProps {
  className?: string
}

export function LevelUp({ className }: LevelUpProps) {
  return (
    <section
      id="jornada"
      className={cn(
        'relative flex flex-col items-center gap-14 overflow-hidden bg-arcade-footer px-6 py-16 lg:px-20 lg:py-24',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-40 size-125 rounded-full bg-arcade-cyan opacity-10 blur-[75px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-64 size-125 rounded-full bg-arcade-cyan opacity-10 blur-[75px]"
      />
      <img
        src="/images/grid-texture.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <SectionHeader
        badge={levelUpCopy.badge}
        subtitle={levelUpCopy.subtitle}
        title={levelUpCopy.title}
        description={levelUpCopy.description}
      />

      <LevelUpPath className="relative w-full" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

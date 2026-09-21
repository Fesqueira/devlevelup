import { LevelUpHeader } from '../components/levelup/LevelUpHeader'
import { LevelUpPath } from '../components/levelup/LevelUpPath'
import { cn } from '../lib/utils'

interface LevelUpProps {
  className?: string
}

export function LevelUp({ className }: LevelUpProps) {
  return (
    <section
      id="jornada"
      className={cn(
        'relative flex flex-col items-center gap-14 overflow-hidden bg-arcade-background px-6 py-16 lg:px-20 lg:py-24',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-40 size-[500px] rounded-full bg-arcade-purple-glow opacity-10 blur-[75px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-64 size-[500px] rounded-full bg-arcade-cyan opacity-10 blur-[75px]"
      />
      <img
        src="/images/grid-texture.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <LevelUpHeader />

      <LevelUpPath className="relative w-full" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

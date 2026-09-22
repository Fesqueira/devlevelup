import { SquadCard } from '../components/squad/SquadCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Starfield } from '../components/ui/Starfield'
import { squadCopy } from '../data/squad'
import { cn } from '../lib/utils'

const squadStagger = ['lg:mb-0', 'lg:mb-6', 'lg:mb-11', 'lg:mb-15']

interface SquadProps {
  className?: string
}

export function Squad({ className }: SquadProps) {
  return (
    <section
      id="squads"
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

      <Starfield />

      <SectionHeader
        badge={squadCopy.badge}
        title={squadCopy.title}
        description={squadCopy.description}
      />

      <div className="relative flex w-full max-w-300 flex-col items-center">
        <div className="relative z-10 grid w-full grid-cols-2 items-end gap-6 lg:grid-cols-4">
          {squadCopy.roles.map((role, index) => (
            <SquadCard
              key={role.label}
              role={role}
              className={squadStagger[index]}
            />
          ))}
        </div>
        <img
          src="/images/avatar-squad/pixel_plataform.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none -mt-28 h-48 w-full object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

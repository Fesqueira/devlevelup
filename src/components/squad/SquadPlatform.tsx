import type { SquadRole } from '../../data/squad'
import { SquadCard } from './SquadCard'
import { cn } from '../../lib/utils'

const FLOAT_STAGGER_S = 0.5

interface SquadPlatformProps {
  roles: readonly SquadRole[]
  className?: string
}

export function SquadPlatform({ roles, className }: SquadPlatformProps) {
  return (
    <div
      className={cn('relative h-56 w-full bg-cover bg-center', className)}
      style={{
        backgroundImage: "url('/images/avatar-squad/pixel_plataform.png')",
        imageRendering: 'pixelated',
      }}
    >
      {roles.map((role, index) => (
        <div
          key={role.label}
          className="absolute -translate-x-1/2 -translate-y-full hover:z-20 focus-within:z-20"
          style={{ left: `${role.position.x}%`, top: `${role.position.y}%` }}
        >
          <SquadCard role={role} floatDelay={index * FLOAT_STAGGER_S} />
        </div>
      ))}
    </div>
  )
}

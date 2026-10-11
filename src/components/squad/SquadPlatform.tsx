import { useRef } from 'react'
import type { SquadRole } from '../../data/squad'
import { SquadCard } from './SquadCard'
import { cn } from '../../lib/utils'
import { useElementWidth } from '../../hooks/useElementWidth'

const FLOAT_STAGGER_S = 0.5
const DESIGN_WIDTH = 1200
const DESIGN_HEIGHT = 224
const MIN_SCALE = 0.8

interface SquadPlatformProps {
  roles: readonly SquadRole[]
  className?: string
}

export function SquadPlatform({ roles, className }: SquadPlatformProps) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const trackRef = useRef<HTMLDivElement>(null)

  const scale =
    width > 0 ? Math.min(1, Math.max(MIN_SCALE, width / DESIGN_WIDTH)) : 1

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <div
        className="overflow-x-auto"
        onScroll={(event) => {
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${-event.currentTarget.scrollLeft}px)`
          }
        }}
      >
        <div
          className="mx-auto bg-cover bg-center"
          style={{
            width: DESIGN_WIDTH * scale,
            height: DESIGN_HEIGHT * scale,
            backgroundImage: "url('/images/avatar-squad/pixel_plataform.webp')",
            imageRendering: 'pixelated',
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={trackRef}
          className="mx-auto"
          style={{ width: DESIGN_WIDTH * scale, height: DESIGN_HEIGHT * scale }}
        >
          <div
            className="relative origin-top-left"
            style={{
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            {roles.map((role, index) => (
              <div
                key={role.label}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-full hover:z-20 focus-within:z-20"
                style={{
                  left: `${role.position.x}%`,
                  top: `${role.position.y}%`,
                }}
              >
                <SquadCard role={role} floatDelay={index * FLOAT_STAGGER_S} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

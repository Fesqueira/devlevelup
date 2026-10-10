import { heroCopy } from '../../data/hero'
import { cn } from '../../lib/utils'

interface HeroSceneProps {
  className?: string
}

export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div
      className={cn(
        'absolute inset-x-0 top-0 h-[60vh] min-h-[420px] overflow-hidden lg:hidden',
        className,
      )}
    >
      <img
        src="/images/hero/rpg_scene.webp"
        alt={heroCopy.sceneAlt}
        className="absolute inset-0 h-full w-full object-cover object-[75%_50%]"
        loading="eager"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-arcade-scene-overlay"
      />
    </div>
  )
}

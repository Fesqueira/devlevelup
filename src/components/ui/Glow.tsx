import { cn } from '../../lib/utils'

interface GlowProps {
  tone?: 'cyan' | 'purple' | 'level'
  opacity?: 4 | 10 | 11 | 12 | 13 | 15 | 60
  blur?: 30 | 60 | 75
  className?: string
}

export function Glow({
  tone = 'cyan',
  opacity = 10,
  blur = 75,
  className,
}: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full',
        tones[tone],
        opacities[opacity],
        blurs[blur],
        className,
      )}
    />
  )
}

const tones: Record<NonNullable<GlowProps['tone']>, string> = {
  cyan: 'bg-arcade-cyan',
  purple: 'bg-arcade-purple-glow',
  level: 'bg-arcade-level',
}

const opacities: Record<NonNullable<GlowProps['opacity']>, string> = {
  4: 'opacity-[0.04]',
  10: 'opacity-10',
  11: 'opacity-[0.11]',
  12: 'opacity-12',
  13: 'opacity-[0.13]',
  15: 'opacity-15',
  60: 'opacity-60',
}

const blurs: Record<NonNullable<GlowProps['blur']>, string> = {
  30: 'blur-[30px]',
  60: 'blur-[60px]',
  75: 'blur-[75px]',
}

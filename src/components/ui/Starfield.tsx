import { cn } from '../../lib/utils'

interface StarfieldProps {
  className?: string
}

interface Star {
  left: string
  top: string
  size: number
  opacity: number
  color: 'white' | 'dim' | 'cyan'
  glow?: boolean
}

const stars: Star[] = [
  { left: '3%', top: '5%', size: 2, opacity: 0.5, color: 'dim' },
  {
    left: '9%',
    top: '12%',
    size: 3,
    opacity: 0.85,
    color: 'white',
    glow: true,
  },
  { left: '16%', top: '4%', size: 2, opacity: 0.4, color: 'dim' },
  { left: '22%', top: '18%', size: 2, opacity: 0.55, color: 'dim' },
  { left: '28%', top: '8%', size: 2, opacity: 0.45, color: 'dim' },
  { left: '34%', top: '22%', size: 3, opacity: 0.7, color: 'white' },
  { left: '41%', top: '6%', size: 2, opacity: 0.5, color: 'dim' },
  { left: '47%', top: '16%', size: 2, opacity: 0.4, color: 'dim' },
  { left: '53%', top: '4%', size: 3, opacity: 0.8, color: 'white', glow: true },
  { left: '59%', top: '20%', size: 2, opacity: 0.5, color: 'dim' },
  { left: '66%', top: '9%', size: 2, opacity: 0.45, color: 'dim' },
  { left: '72%', top: '17%', size: 2, opacity: 0.55, color: 'dim' },
  { left: '78%', top: '5%', size: 3, opacity: 0.75, color: 'white' },
  { left: '85%', top: '14%', size: 2, opacity: 0.4, color: 'dim' },
  { left: '91%', top: '7%', size: 2, opacity: 0.5, color: 'dim' },
  {
    left: '97%',
    top: '19%',
    size: 3,
    opacity: 0.85,
    color: 'white',
    glow: true,
  },
  { left: '6%', top: '38%', size: 3, opacity: 0.07, color: 'cyan' },
  { left: '18%', top: '52%', size: 4, opacity: 0.06, color: 'cyan' },
  { left: '31%', top: '44%', size: 3, opacity: 0.08, color: 'cyan' },
  { left: '44%', top: '58%', size: 4, opacity: 0.05, color: 'cyan' },
  { left: '57%', top: '42%', size: 3, opacity: 0.07, color: 'cyan' },
  { left: '70%', top: '55%', size: 4, opacity: 0.06, color: 'cyan' },
  { left: '83%', top: '46%', size: 3, opacity: 0.08, color: 'cyan' },
  { left: '94%', top: '60%', size: 4, opacity: 0.05, color: 'cyan' },
  { left: '8%', top: '78%', size: 2, opacity: 0.35, color: 'dim' },
  { left: '20%', top: '86%', size: 2, opacity: 0.3, color: 'dim' },
  { left: '36%', top: '82%', size: 2, opacity: 0.38, color: 'dim' },
  { left: '52%', top: '88%', size: 2, opacity: 0.32, color: 'dim' },
  { left: '68%', top: '80%', size: 2, opacity: 0.35, color: 'dim' },
  { left: '84%', top: '87%', size: 2, opacity: 0.3, color: 'dim' },
  { left: '95%', top: '76%', size: 2, opacity: 0.38, color: 'dim' },
]

const starColor = {
  white: 'bg-arcade-white',
  dim: 'bg-arcade-text-secondary',
  cyan: 'bg-arcade-cyan',
} as const

export function Starfield({ className }: StarfieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className={cn(
            'absolute rounded-full',
            starColor[star.color],
            star.glow && 'shadow-arcade-glow',
          )}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

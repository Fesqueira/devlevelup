import { BoltIcon, XCircleIcon } from '../ui/icons'
import { cn } from '../../lib/utils'

interface ComparisonCardProps {
  variant: 'isolated' | 'ecosystem'
  eyebrow: string
  title: string
  bullets: readonly string[]
  className?: string
}

const cardClasses = {
  isolated: 'border-arcade-card-border bg-arcade-comparison-card',
  ecosystem:
    'border-arcade-cyan bg-arcade-comparison-card-active shadow-arcade-card-glow backdrop-blur-xl',
} as const

const eyebrowClasses = {
  isolated: 'text-arcade-footer-text',
  ecosystem: 'text-arcade-cyan',
} as const

const iconBoxClasses = {
  isolated: 'border-arcade-icon-border bg-arcade-nav-muted text-arcade-footer',
  ecosystem:
    'border-arcade-cyan-icon-border bg-arcade-cyan-icon text-arcade-cyan',
} as const

export function ComparisonCard({
  variant,
  eyebrow,
  title,
  bullets,
  className,
}: ComparisonCardProps) {
  const Icon = variant === 'ecosystem' ? BoltIcon : XCircleIcon

  return (
    <article
      className={cn(
        'flex flex-col gap-6 rounded-2xl border p-8 lg:h-95',
        cardClasses[variant],
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <p
          className={cn(
            'font-inter text-xs font-semibold uppercase tracking-wider',
            eyebrowClasses[variant],
          )}
        >
          {eyebrow}
        </p>
        <h3 className="font-inter text-xl font-semibold leading-[26px] text-arcade-footer-heading">
          {title}
        </h3>
      </div>

      <ul className="flex flex-col gap-4">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-md border',
                iconBoxClasses[variant],
              )}
            >
              <Icon className="size-3" />
            </span>
            <p className="font-inter text-sm font-medium leading-5 text-arcade-comparison-bullet">
              {bullet}
            </p>
          </li>
        ))}
      </ul>
    </article>
  )
}

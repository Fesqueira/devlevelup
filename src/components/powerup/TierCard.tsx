import { cn } from '../../lib/utils'

interface TierCardProps {
  name: string
  price: string
  description: string
  featured?: boolean
  featuredLabel?: string
  className?: string
}

export function TierCard({
  name,
  price,
  description,
  featured,
  featuredLabel,
  className,
}: TierCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-2xl border bg-arcade-powerup-card p-8 backdrop-blur-xl',
        featured
          ? 'border-arcade-purple-glow shadow-arcade-tier-featured'
          : 'border-arcade-nav-border shadow-arcade-powerup-card',
        className,
      )}
    >
      {featured && featuredLabel && (
        <span className="self-start rounded-full border border-arcade-purple-glow bg-arcade-purple-badge px-2.5 py-1.5 font-inter text-xs font-bold uppercase tracking-wider text-arcade-purple-glow">
          {featuredLabel}
        </span>
      )}
      <h3 className="font-inter text-xl font-semibold leading-6 text-arcade-footer-heading">
        {name}
      </h3>
      <p
        className={cn(
          'font-inter font-bold leading-8',
          featured
            ? 'text-[28px] text-arcade-purple-glow'
            : 'text-2xl text-arcade-cyan',
        )}
      >
        {price}
      </p>
      <p className="font-roboto-flex text-sm font-medium leading-6 text-arcade-footer-text">
        {description}
      </p>
    </article>
  )
}

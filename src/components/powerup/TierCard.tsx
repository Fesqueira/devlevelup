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
        'flex flex-col gap-4 rounded-2xl border bg-arcade-powerup-card p-8 backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 motion-reduce:transform-none',
        featured
          ? 'border-arcade-purple-glow shadow-arcade-tier-featured hover:shadow-arcade-tier-featured'
          : 'border-arcade-nav-border shadow-arcade-powerup-card hover:border-arcade-cyan/60 hover:shadow-arcade-card-glow',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-sans text-xl font-semibold leading-6 text-arcade-footer-heading">
          {name}
        </h3>
        {featured && featuredLabel && (
          <span className="shrink-0 rounded-full border border-arcade-purple-glow bg-arcade-purple-badge px-2.5 py-1.5 font-sora text-xs font-bold uppercase tracking-wider text-arcade-purple-glow">
            {featuredLabel}
          </span>
        )}
      </div>
      <p
        className={cn(
          'font-sans font-bold leading-8',
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

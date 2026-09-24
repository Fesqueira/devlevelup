import { cn } from '../../lib/utils'

interface SectionHeaderProps {
  badge?: string
  subtitle?: string
  title?: string
  description?: string
  className?: string
}

export function SectionHeader({
  badge,
  subtitle,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {badge && (
        <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-4 py-1.5 font-sora text-xs font-semibold uppercase tracking-wider text-arcade-cyan">
          {badge}
        </span>
      )}
      <div className="flex flex-col items-center gap-1">
        {title && (
          <h2 className="text-center font-sans text-2xl font-bold leading-10 text-arcade-white sm:text-3xl lg:text-[32px]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center font-sans text-lg font-semibold leading-7 text-arcade-footer-text sm:text-xl">
            {subtitle}
          </p>
        )}
      </div>
      {description && (
        <p className="max-w-160 text-center font-roboto-flex text-base font-medium leading-6 text-arcade-footer-text">
          {description}
        </p>
      )}
    </div>
  )
}

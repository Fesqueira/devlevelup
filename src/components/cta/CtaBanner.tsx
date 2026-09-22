import { siteConfig } from '../../config'
import { ctaCopy } from '../../data/cta'
import { cn } from '../../lib/utils'
import { BoltIcon } from '../ui/icons'
import { MascotIdle } from './MascotIdle'

interface CtaBannerProps {
  className?: string
}

export function CtaBanner({ className }: CtaBannerProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-6 rounded-2xl border border-arcade-cyan/30 bg-arcade-background px-6 py-6 shadow-arcade-cta-cyan sm:px-10 lg:h-32 lg:flex-row lg:justify-between lg:gap-12',
        className,
      )}
    >
      <h2 className="max-w-2xl font-display text-xl font-bold leading-snug text-arcade-white sm:text-2xl">
        {ctaCopy.titleBefore}{' '}
        <span className="text-arcade-cyan">{ctaCopy.titleHighlight}</span>{' '}
        {ctaCopy.titleAfter}
      </h2>

      <div className="flex flex-none items-center justify-center gap-4 sm:gap-6">
        <MascotIdle alt={ctaCopy.mascotAlt} className="size-16 sm:size-20" />
        <a
          href={siteConfig.links.apoia}
          className="inline-flex items-center gap-2 rounded-lg bg-arcade-cyan px-6 py-3.5 font-inter text-base font-bold leading-6 text-arcade-950 shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary sm:px-8"
        >
          {ctaCopy.buttonLabel}
          <BoltIcon className="size-5" />
        </a>
      </div>
    </div>
  )
}

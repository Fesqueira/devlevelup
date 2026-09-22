import { siteConfig } from '../../config'
import { ctaCopy } from '../../data/cta'
import { cn } from '../../lib/utils'
import { BoltIcon, CodeIcon } from '../ui/icons'

interface CtaBannerProps {
  className?: string
}

export function CtaBanner({ className }: CtaBannerProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-10 overflow-hidden rounded-2xl border border-arcade-cyan/30 bg-arcade-background p-6 shadow-arcade-cta-cyan sm:p-10 lg:flex-row lg:justify-between lg:gap-12 lg:p-12',
        className,
      )}
    >
      <h2 className="max-w-2xl font-display text-2xl font-bold leading-snug text-arcade-white sm:text-3xl lg:text-4xl">
        <span className="block">{ctaCopy.titleBefore}</span>
        <span className="block text-arcade-cyan">{ctaCopy.titleHighlight}</span>
        <span className="block">{ctaCopy.titleAfter}</span>
      </h2>

      <div className="flex flex-none items-center justify-center gap-4 sm:gap-6">
        <img
          src="/images/mascote-apontando.png"
          alt={ctaCopy.mascotAlt}
          className="size-20 shrink-0 object-contain sm:size-32"
        />
        <a
          href={siteConfig.links.apoia}
          className="inline-flex items-center gap-2 rounded-lg bg-arcade-cyan px-6 py-3.5 font-inter text-base font-bold leading-6 text-arcade-950 shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary sm:px-8"
        >
          {ctaCopy.buttonLabel}
          <BoltIcon className="size-5" />
        </a>
      </div>

      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 flex size-8 items-center justify-center rounded-md bg-arcade-neon text-arcade-white shadow-arcade-cta-cyan sm:size-10"
      >
        <CodeIcon className="size-4 sm:size-5" />
      </span>
    </div>
  )
}

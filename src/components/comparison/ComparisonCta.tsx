import { siteConfig } from '../../config'
import { comparisonCopy } from '../../data/comparison'
import { cn } from '../../lib/utils'
import { Mascot } from '../ui/Mascot'

interface ComparisonCtaProps {
  className?: string
}

export function ComparisonCta({ className }: ComparisonCtaProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <Mascot
          src="/images/mascote-apontando.png"
          alt=""
          aria-hidden="true"
          className="size-16 shrink-0 sm:size-20"
        />
        <a
          href={siteConfig.links.apoia}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 max-w-full items-center justify-center rounded-lg bg-arcade-cyan px-4 text-center font-sans text-sm font-bold leading-5 text-arcade-footer shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary sm:px-6"
        >
          {comparisonCopy.cta}
        </a>
        <p className="text-center font-sans text-xs font-semibold leading-4 text-arcade-footer-text">
          {comparisonCopy.ctaSubtext}
        </p>
      </div>
    </div>
  )
}

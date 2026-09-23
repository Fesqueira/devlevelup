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
      <div className="flex items-center gap-3 sm:gap-4">
        <Mascot
          src="/images/mascote-apontando.png"
          alt=""
          aria-hidden="true"
          className="size-16 sm:size-20"
        />
        <a
          href={siteConfig.links.apoia}
          className="rounded-lg bg-arcade-cyan px-8 py-3.5 font-inter text-base font-bold leading-6 text-arcade-footer shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary"
        >
          {comparisonCopy.cta}
        </a>
      </div>
      <p className="font-inter text-xs font-semibold leading-4 text-arcade-footer-text">
        {comparisonCopy.ctaSubtext}
      </p>
    </div>
  )
}

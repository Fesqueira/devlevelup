import { siteConfig } from '../../config'
import { comparisonCopy } from '../../data/comparison'
import { cn } from '../../lib/utils'

interface ComparisonCtaProps {
  className?: string
}

export function ComparisonCta({ className }: ComparisonCtaProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src="/images/mascote-apontando.png"
          alt=""
          aria-hidden="true"
          className="size-16 shrink-0 object-contain sm:size-20"
        />
        <a
          href={siteConfig.links.apoia}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-arcade-cyan px-8 py-3.5 font-sans text-base font-bold leading-6 text-arcade-footer shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary"
        >
          {comparisonCopy.cta}
        </a>
      </div>
      <p className="font-sans text-xs font-semibold leading-4 text-arcade-footer-text">
        {comparisonCopy.ctaSubtext}
      </p>
    </div>
  )
}

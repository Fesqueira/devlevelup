import { Button } from '../ui/Button'
import { HeartIcon, PlayIcon } from '../ui/icons'
import { siteConfig } from '../../config'
import { heroCopy } from '../../data/hero'
import { cn } from '../../lib/utils'

interface HeroActionsProps {
  className?: string
}

export function HeroActions({ className }: HeroActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4',
        className,
      )}
    >
      <Button
        href={siteConfig.links.apoia}
        variant="cyan"
        size="lg"
        className="w-full justify-center rounded-lg px-4 py-3.5 font-sans text-[13px] tracking-[0.04em] shadow-arcade-hero-cta after:hidden lg:w-auto lg:rounded-xl lg:px-5 lg:shadow-arcade-cta-cyan"
      >
        <HeartIcon className="size-4" />
        {heroCopy.primaryCta}
      </Button>
      <Button
        href="#jornada"
        target="_self"
        variant="secondary"
        size="lg"
        className="w-full justify-center rounded-lg border-[1.5px] px-4 py-3.5 font-sans text-[13px] tracking-[0.04em] after:hidden lg:w-auto lg:rounded-xl lg:border-2 lg:px-4"
      >
        <PlayIcon className="size-4" />
        {heroCopy.secondaryCta}
      </Button>
    </div>
  )
}

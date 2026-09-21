import { HeroActions } from '../components/hero/HeroActions'
import { HeroBackground } from '../components/hero/HeroBackground'
import { HeroDescription } from '../components/hero/HeroDescription'
import { HeroEyebrow } from '../components/hero/HeroEyebrow'
import { HeroScene } from '../components/hero/HeroScene'
import { HeroStats } from '../components/hero/HeroStats'
import { HeroTitle } from '../components/hero/HeroTitle'
import { cn } from '../lib/utils'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-arcade-background px-6 py-16 lg:flex-row lg:justify-start lg:min-h-svh lg:px-20 lg:py-24',
        className,
      )}
    >
      <HeroBackground />

      <div className="relative flex w-full flex-col gap-7 lg:w-155">
        <HeroEyebrow />
        <HeroTitle />
        <HeroDescription />
        <HeroScene />
        <HeroActions />
        <HeroStats />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

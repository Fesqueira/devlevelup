import { HeroActions } from '../components/hero/HeroActions'
import { HeroBackground } from '../components/hero/HeroBackground'
import { HeroDescription } from '../components/hero/HeroDescription'
import { HeroEyebrow } from '../components/hero/HeroEyebrow'
import { HeroScene } from '../components/hero/HeroScene'
import { HeroStats } from '../components/hero/HeroStats'
import { HeroTitle } from '../components/hero/HeroTitle'
import { ArcadePanel } from '../components/ui/ArcadePanel'
import { cn } from '../lib/utils'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      id="inicio"
      tabIndex={-1}
      className={cn(
        'relative flex flex-col items-center gap-6 overflow-hidden bg-arcade-background py-16 focus:outline-none lg:min-h-svh lg:flex-row lg:justify-start lg:px-20 lg:py-30',
        className,
      )}
    >
      <HeroBackground />
      <HeroScene />

      <div className="relative flex w-full flex-col gap-6 lg:w-155">
        <ArcadePanel className="relative mx-4 flex flex-col gap-6 rounded-xl border bg-arcade-hud p-5 shadow-none backdrop-blur-none lg:mx-0 lg:rounded-2xl lg:bg-arcade-panel lg:p-8 lg:shadow-arcade-panel lg:backdrop-blur-[14px]">
          <HeroEyebrow />
          <HeroTitle />
          <HeroDescription />
          <HeroActions />
        </ArcadePanel>

        <HeroStats className="relative mx-4 lg:mx-0" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

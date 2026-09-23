import { ProgressWidget } from '../components/powerup/ProgressWidget'
import { TierCard } from '../components/powerup/TierCard'
import { Glow } from '../components/ui/Glow'
import { Mascot } from '../components/ui/Mascot'
import { SectionHeader } from '../components/ui/SectionHeader'
import { siteConfig } from '../config'
import { powerUpCopy } from '../data/powerup'
import { cn } from '../lib/utils'

interface PowerUpProps {
  className?: string
}

export function PowerUp({ className }: PowerUpProps) {
  return (
    <section
      id="power-up"
      className={cn(
        'relative flex flex-col items-center gap-10 overflow-hidden bg-arcade-footer px-6 py-16 lg:px-20 lg:py-24',
        className,
      )}
    >
      <Glow
        tone="cyan"
        opacity={10}
        blur={60}
        className="-left-30 top-30 size-105"
      />
      <Glow
        tone="purple"
        opacity={10}
        blur={60}
        className="-right-25 top-20 size-90"
      />

      <SectionHeader
        badge={powerUpCopy.badge}
        title={powerUpCopy.title}
        subtitle={powerUpCopy.subtitle}
        className="relative z-10"
      />

      <ProgressWidget
        {...powerUpCopy.progress}
        className="relative z-10 w-full max-w-320"
      />

      <div className="relative z-10 flex w-full max-w-320 flex-col gap-6 lg:flex-row">
        {powerUpCopy.tiers.map((tier) => (
          <TierCard
            key={tier.name}
            name={tier.name}
            price={tier.price}
            description={tier.description}
            featured={tier.featured}
            featuredLabel={tier.featuredLabel}
            className="w-full lg:flex-1"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <Mascot alt={powerUpCopy.cta.mascotAlt} glow />
        <a
          href={siteConfig.links.apoia}
          className="inline-flex items-center gap-2 rounded-lg bg-arcade-cyan px-6 py-3.5 font-inter text-base font-bold leading-6 text-arcade-950 shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary sm:px-8"
        >
          {powerUpCopy.cta.label}
        </a>
      </div>
    </section>
  )
}

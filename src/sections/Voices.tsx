import { VoicesCarousel } from '../components/voices/VoicesCarousel'
import { VoicesGlows } from '../components/voices/VoicesGlows'
import { SectionHeader } from '../components/ui/SectionHeader'
import { vozesCopy } from '../data/vozes'
import { cn } from '../lib/utils'

interface VoicesProps {
  className?: string
}

export function Voices({ className }: VoicesProps) {
  return (
    <section
      id="vozes"
      className={cn(
        'relative flex flex-col items-center gap-14 overflow-hidden bg-arcade-footer px-6 py-16 lg:px-20 lg:py-24',
        className,
      )}
    >
      <VoicesGlows />

      <SectionHeader
        badge={vozesCopy.badge}
        title={vozesCopy.title}
        description={vozesCopy.description}
        className="relative z-10"
      />

      <VoicesCarousel
        testimonials={vozesCopy.testimonials}
        className="relative z-10 w-full"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-6 bg-arcade-950"
      />
    </section>
  )
}

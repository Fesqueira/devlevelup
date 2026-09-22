import { VoicesCarousel } from '../components/voices/VoicesCarousel'
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
      <div
        aria-hidden="true"
        className="absolute -left-30 top-20 size-90 rounded-full bg-arcade-purple-glow opacity-15 blur-[60px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-30 top-20 size-90 rounded-full bg-arcade-cyan opacity-12 blur-[60px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-30 bottom-10 size-90 rounded-full bg-arcade-cyan opacity-12 blur-[60px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-30 bottom-10 size-90 rounded-full bg-arcade-purple-glow opacity-15 blur-[60px]"
      />

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

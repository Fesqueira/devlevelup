import { CtaBanner } from '../components/cta/CtaBanner'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../lib/utils'

interface CTAProps {
  className?: string
}

export function CTA({ className }: CTAProps) {
  return (
    <Reveal>
      <section
        className={cn(
          'bg-arcade-footer px-6 py-16 lg:px-20 lg:py-30',
          className,
        )}
      >
        <div className="w-full">
          <CtaBanner />
        </div>
      </section>
    </Reveal>
  )
}

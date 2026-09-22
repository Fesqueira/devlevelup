import { CtaBanner } from '../components/cta/CtaBanner'
import { cn } from '../lib/utils'

interface CTAProps {
  className?: string
}

export function CTA({ className }: CTAProps) {
  return (
    <section
      className={cn('bg-arcade-footer px-6 py-16 lg:px-20 lg:py-24', className)}
    >
      <div className="mx-auto w-full max-w-300">
        <CtaBanner />
      </div>
    </section>
  )
}

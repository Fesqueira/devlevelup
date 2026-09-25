import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Testimonial } from '../../data/vozes'
import { cn } from '../../lib/utils'
import { TestimonialCard } from './TestimonialCard'

interface VoicesCarouselProps {
  testimonials: readonly Testimonial[]
  className?: string
}

const offsetClasses: Record<number, string> = {
  0: 'z-30 -translate-x-1/2 scale-[1.05] opacity-100',
  1: 'z-20 translate-x-[calc(-50%-280px)] scale-90 opacity-70',
  '-1': 'z-20 translate-x-[calc(-50%+280px)] scale-90 opacity-70',
  2: 'z-10 translate-x-[calc(-50%-530px)] scale-[0.82] opacity-35',
  '-2': 'z-10 translate-x-[calc(-50%+530px)] scale-[0.82] opacity-35',
}

const controlClasses =
  'flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-arcade-voice-cyan hover:text-arcade-voice-cyan focus-visible:ring-2 focus-visible:ring-arcade-voice-cyan'

export function VoicesCarousel({
  testimonials,
  className,
}: VoicesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length)
  }

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div
        className="relative hidden h-125 w-full lg:block"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos da comunidade"
      >
        {testimonials.map((testimonial, index) => {
          const span = Math.floor(testimonials.length / 2)
          let offset = activeIndex - index
          if (offset > span) offset -= testimonials.length
          if (offset < -span) offset += testimonials.length
          const isActive = offset === 0
          return (
            <div
              key={testimonial.name}
              inert={!isActive}
              aria-hidden={!isActive}
              className={cn(
                'absolute left-1/2 top-1/2 -translate-y-1/2 transition-all duration-500',
                offsetClasses[offset],
              )}
            >
              <TestimonialCard testimonial={testimonial} active={isActive} />
            </div>
          )
        })}
      </div>

      <div className="w-full max-w-80 lg:hidden">
        <TestimonialCard testimonial={activeTestimonial} active />
      </div>

      <p className="sr-only" role="status">
        {activeTestimonial.name}
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Depoimento anterior"
          className={controlClasses}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir para depoimento de ${testimonial.name}`}
              aria-current={index === activeIndex}
              className={cn(
                'h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-arcade-voice-cyan',
                index === activeIndex
                  ? 'w-6 bg-arcade-voice-cyan'
                  : 'w-2 bg-white/25 hover:bg-white/40',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Próximo depoimento"
          className={controlClasses}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import type { Testimonial } from '../../data/vozes'
import { cn } from '../../lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/icons'
import { TestimonialCard } from './TestimonialCard'

interface VoicesCarouselProps {
  testimonials: readonly Testimonial[]
  className?: string
}

const offsetClasses: Record<number, string> = {
  0: 'z-30 -translate-x-1/2 scale-100 opacity-100',
  1: 'z-20 -translate-x-[150%] scale-90 opacity-65',
  '-1': 'z-20 translate-x-[50%] scale-90 opacity-65',
  2: 'z-10 -translate-x-[250%] scale-80 opacity-40',
  '-2': 'z-10 translate-x-[150%] scale-80 opacity-40',
}

export function VoicesCarousel({
  testimonials,
  className,
}: VoicesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length)
  }

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div className="relative hidden h-125 w-full lg:block">
        {testimonials.map((testimonial, index) => {
          const span = Math.floor(testimonials.length / 2)
          let offset = activeIndex - index
          if (offset > span) offset -= testimonials.length
          if (offset < -span) offset += testimonials.length
          return (
            <div
              key={testimonial.name}
              className={cn(
                'absolute left-1/2 top-1/2 -translate-y-1/2 transition-all duration-500',
                offsetClasses[offset],
              )}
            >
              <TestimonialCard
                testimonial={testimonial}
                active={offset === 0}
              />
            </div>
          )
        })}
      </div>

      <div className="w-full max-w-80 lg:hidden">
        <TestimonialCard testimonial={testimonials[activeIndex]} active />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Depoimento anterior"
          className="flex size-12 items-center justify-center rounded-full border border-arcade-nav-border bg-arcade-navbar text-arcade-nav-muted transition-colors hover:border-arcade-cyan hover:text-arcade-cyan"
        >
          <ArrowLeftIcon className="size-5" />
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
                'h-2 rounded-full transition-all',
                index === activeIndex
                  ? 'w-6 bg-arcade-cyan'
                  : 'w-2 bg-arcade-nav-border',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Próximo depoimento"
          className="flex size-12 items-center justify-center rounded-full border border-arcade-nav-border bg-arcade-navbar text-arcade-cyan transition-colors hover:border-arcade-cyan"
        >
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}

import type { Testimonial } from '../../data/vozes'
import { cn } from '../../lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  active?: boolean
  className?: string
}

export function TestimonialCard({
  testimonial,
  active = false,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'flex w-70 flex-col gap-6 rounded-2xl border bg-arcade-comparison-card p-8',
        active
          ? 'border-arcade-cyan shadow-arcade-card-glow'
          : 'border-arcade-nav-border',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="font-inter text-[28px] font-bold leading-9 text-arcade-cyan"
        >
          ❝
        </span>
        <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-2.5 py-0.5 font-inter text-[10px] font-bold uppercase tracking-wide text-arcade-cyan">
          {testimonial.topic}
        </span>
      </div>

      <p className="font-inter text-lg leading-6 text-arcade-footer-heading">
        {testimonial.quote}
      </p>

      <div
        aria-hidden="true"
        className="h-px w-full bg-arcade-footer-divider"
      />

      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={`Foto de ${testimonial.name}`}
          className="size-12 rounded-full border-[1.5px] border-arcade-cyan object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="font-inter text-[15px] font-bold leading-5 text-arcade-footer-heading">
            {testimonial.name}
          </p>
          <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-2.5 py-0.5 font-inter text-[11px] font-bold uppercase leading-3.5 text-arcade-cyan">
            {testimonial.role}
          </span>
          <p className="font-roboto-flex text-[11px] leading-3.5 text-arcade-nav-muted">
            {testimonial.membership}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {testimonial.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-arcade-purple-glow bg-arcade-footer px-2.5 py-1 font-inter text-[10px] font-bold leading-3.5 text-arcade-purple-glow"
          >
            {badge}
          </span>
        ))}
      </div>
    </article>
  )
}

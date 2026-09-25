import { Quote } from 'lucide-react'
import type { Testimonial, VoiceColor } from '../../data/vozes'
import { cn } from '../../lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  active?: boolean
  className?: string
}

const colorClasses: Record<
  VoiceColor,
  { text: string; border: string; bg: string; accent: string }
> = {
  pink: {
    text: 'text-arcade-voice-pink',
    border: 'border-arcade-voice-pink/25',
    bg: 'bg-arcade-voice-pink/15',
    accent: 'bg-arcade-voice-pink',
  },
  blue: {
    text: 'text-arcade-voice-blue',
    border: 'border-arcade-voice-blue/25',
    bg: 'bg-arcade-voice-blue/15',
    accent: 'bg-arcade-voice-blue',
  },
  cyan: {
    text: 'text-arcade-voice-cyan',
    border: 'border-arcade-voice-cyan/25',
    bg: 'bg-arcade-voice-cyan/15',
    accent: 'bg-arcade-voice-cyan',
  },
  purple: {
    text: 'text-arcade-voice-purple',
    border: 'border-arcade-voice-purple/25',
    bg: 'bg-arcade-voice-purple/15',
    accent: 'bg-arcade-voice-purple',
  },
  teal: {
    text: 'text-arcade-voice-teal',
    border: 'border-arcade-voice-teal/25',
    bg: 'bg-arcade-voice-teal/15',
    accent: 'bg-arcade-voice-teal',
  },
}

export function TestimonialCard({
  testimonial,
  active = false,
  className,
}: TestimonialCardProps) {
  const color = colorClasses[testimonial.color]
  const initial = testimonial.name.charAt(0)

  return (
    <article
      className={cn(
        'flex w-70 flex-col gap-6 rounded-2xl border bg-arcade-comparison-card p-8 transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 motion-reduce:transform-none',
        active
          ? 'border-arcade-cyan shadow-arcade-card-glow hover:border-arcade-purple-glow hover:shadow-arcade-tier-featured'
          : 'border-arcade-nav-border hover:border-arcade-cyan/60 hover:shadow-arcade-card-glow',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="font-sans text-[28px] font-bold leading-9 text-arcade-cyan"
        >
          ❝
        </span>
        <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-2.5 py-0.5 font-sora text-[10px] font-bold uppercase tracking-wide text-arcade-cyan">
          {testimonial.topic}
        </span>
      </div>

      <p className="font-sans text-lg leading-6 text-arcade-footer-heading">
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
          <p className="font-sans text-[15px] font-bold leading-5 text-arcade-footer-heading">
            {testimonial.name}
          </p>
          <span className="rounded-full border border-arcade-cyan-badge-border bg-arcade-cyan-badge px-2.5 py-0.5 font-sora text-[11px] font-bold uppercase leading-3.5 text-arcade-cyan">
            {testimonial.role}
          </p>
          <p className="truncate font-roboto-flex text-[11px] leading-4 text-arcade-nav-muted">
            {testimonial.affiliation}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {testimonial.tags.map((tag) => (
          <span
            key={badge}
            className="rounded-full border border-arcade-purple-glow bg-arcade-footer px-2.5 py-1 font-sora text-[10px] font-bold leading-3.5 text-arcade-purple-glow"
          >
            <tag.icon className="size-3" aria-hidden="true" />
            {tag.label}
          </span>
        ))}
      </div>
    </article>
  )
}

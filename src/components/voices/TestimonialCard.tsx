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
        'flex h-[460px] w-70 flex-col gap-5 overflow-hidden rounded-2xl border bg-arcade-powerup-card p-6 transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none',
        active
          ? 'border-arcade-voice-cyan/50 shadow-arcade-voice-featured'
          : 'border-white/10',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn('h-8 w-1 shrink-0 rounded-full', color.accent)}
        />
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sora text-[10px] font-bold uppercase tracking-wide',
            color.border,
            color.bg,
            color.text,
          )}
        >
          <Quote className="size-3" aria-hidden="true" />
          {testimonial.category}
        </span>
      </div>

      <p
        className={cn(
          'min-h-0 flex-1 overflow-hidden font-sans leading-6',
          active ? 'text-lg font-semibold text-white' : 'text-sm text-white/60',
        )}
      >
        {testimonial.quote}
      </p>

      <div
        aria-hidden="true"
        className="h-px w-full bg-arcade-footer-divider"
      />

      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-full font-sans text-base font-bold',
            color.bg,
            color.text,
          )}
        >
          {initial}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate font-sans text-[15px] font-bold leading-5 text-white">
            {testimonial.name}
          </p>
          <p
            className={cn(
              'truncate font-sora text-[10px] font-bold uppercase tracking-wider',
              color.text,
            )}
          >
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
            key={tag.label}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sora text-[10px] font-bold leading-3.5',
              color.border,
              color.bg,
              color.text,
            )}
          >
            <tag.icon className="size-3" aria-hidden="true" />
            {tag.label}
          </span>
        ))}
      </div>
    </article>
  )
}

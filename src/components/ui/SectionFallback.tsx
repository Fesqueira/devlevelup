import { cn } from '../../lib/utils'

interface SectionFallbackProps {
  id: string
  className?: string
}

export function SectionFallback({ id, className }: SectionFallbackProps) {
  return (
    <section
      id={id}
      aria-hidden="true"
      className={cn('min-h-svh bg-arcade-footer', className)}
    />
  )
}

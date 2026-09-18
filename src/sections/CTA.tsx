interface CTAProps {
  className?: string
}

export function CTA({ className = '' }: CTAProps) {
  return (
    <div className={className}>
      <p className="font-display text-arcade-muted">{'CTA'}</p>
    </div>
  )
}

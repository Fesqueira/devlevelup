import type { ImgHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface MascotProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  glow?: boolean
  className?: string
}

export function Mascot({
  className,
  src = '/images/mascote-soujunior.png',
  alt = 'Mascote SouJunior',
  glow = false,
  ...props
}: MascotProps) {
  if (glow) {
    return (
      <div className={cn('relative size-15 flex-none rounded-lg', className)}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-arcade-mascot-glow)_0%,var(--color-arcade-mascot-glow-mid)_50%,var(--color-arcade-mascot-glow-end)_100%)] blur-[9px]"
        />
        <img
          src={src}
          alt={alt}
          className="absolute left-0 top-0 size-15 rounded-lg object-contain"
          {...props}
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'size-15 flex-none rounded-lg object-contain drop-shadow-arcade-mascot',
        className,
      )}
      {...props}
    />
  )
}

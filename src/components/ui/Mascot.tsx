import type { ImgHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface MascotProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  className?: string
}

export function Mascot({
  className,
  src = '/images/mascote-soujunior.png',
  alt = 'Mascote SouJunior',
  ...props
}: MascotProps) {
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

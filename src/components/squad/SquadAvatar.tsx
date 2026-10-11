import { cn } from '../../lib/utils'

interface SquadAvatarProps {
  src: string
  alt: string
  className?: string
}

export function SquadAvatar({ src, alt, className }: SquadAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn('object-contain', className)}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

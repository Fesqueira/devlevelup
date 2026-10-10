import { heroCopy } from '../../data/hero'
import { cn } from '../../lib/utils'

interface HeroDescriptionProps {
  className?: string
}

export function HeroDescription({ className }: HeroDescriptionProps) {
  return (
    <p
      className={cn(
        'font-roboto-flex text-sm leading-normal text-arcade-white lg:text-base lg:leading-[1.6]',
        className,
      )}
    >
      {heroCopy.description}
    </p>
  )
}

import { levelUpCopy } from '../../data/levelup'
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/icons'
import { cn } from '../../lib/utils'

interface CarouselControlsProps {
  canScrollLeft: boolean
  canScrollRight: boolean
  onPrev: () => void
  onNext: () => void
  className?: string
}

const buttonClass =
  'flex size-10 shrink-0 items-center justify-center rounded-lg border border-arcade-icon-border bg-arcade-comparison-card text-arcade-cyan transition-colors hover:border-arcade-cyan/60 hover:bg-arcade-cyan-badge disabled:cursor-not-allowed disabled:opacity-40'

export function CarouselControls({
  canScrollLeft,
  canScrollRight,
  onPrev,
  onNext,
  className,
}: CarouselControlsProps) {
  return (
    <div className={cn('flex items-center gap-3 lg:hidden', className)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canScrollLeft}
        aria-label={levelUpCopy.prevSlideLabel}
        className={buttonClass}
      >
        <ArrowLeftIcon className="size-4" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canScrollRight}
        aria-label={levelUpCopy.nextSlideLabel}
        className={buttonClass}
      >
        <ArrowRightIcon className="size-4" />
      </button>
    </div>
  )
}

import { Fragment, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { levelUpCopy } from '../../data/levelup'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import { CarouselControls } from './CarouselControls'
import { LevelCard } from './LevelCard'
import { LevelConnector } from './LevelConnector'
import { LevelUpCta } from './LevelUpCta'
import { cn } from '../../lib/utils'

interface LevelUpPathProps {
  className?: string
}

export function LevelUpPath({ className }: LevelUpPathProps) {
  const levels = levelUpCopy.levels
  const reduceMotion = Boolean(useReducedMotion())
  const {
    trackRef,
    slideRefs,
    canScrollLeft,
    canScrollRight,
    updateScrollState,
    scrollToSlide,
    scrollBySlide,
  } = useSnapCarousel({
    count: levels.length,
    behavior: reduceMotion ? 'auto' : 'smooth',
  })
  const [unlockedCount, setUnlockedCount] = useState(1)
  const [unlockAnnouncement, setUnlockAnnouncement] = useState('')
  const allUnlocked = unlockedCount >= levels.length

  function handleUnlock() {
    const next = Math.min(unlockedCount + 1, levels.length)
    setUnlockedCount(next)
    scrollToSlide(next - 1)

    const nextLevel = levels[next - 1]
    if (nextLevel) {
      setUnlockAnnouncement(
        `Nível ${nextLevel.level} (${nextLevel.name}) desbloqueado`,
      )
    }
  }

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center gap-10',
        className,
      )}
    >
      <ol
        ref={trackRef}
        onScroll={updateScrollState}
        className="relative flex w-full items-center gap-6 overflow-x-auto px-[calc(50%-min(31vw,8rem))] py-6 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:items-stretch lg:justify-center lg:gap-2 lg:overflow-visible lg:px-0 lg:py-0 lg:snap-none"
      >
        {levels.map((level, index) => (
          <Fragment key={level.level}>
            <LevelCard
              ref={(element) => {
                slideRefs.current[index] = element
              }}
              level={level}
              unlocked={index < unlockedCount}
              current={index === unlockedCount - 1}
              reduceMotion={reduceMotion}
            />
            {index < levels.length - 1 && <LevelConnector />}
          </Fragment>
        ))}
      </ol>

      <div className="flex flex-col items-center gap-4">
        <CarouselControls
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onPrev={() => scrollBySlide(-1)}
          onNext={() => scrollBySlide(1)}
        />
        <LevelUpCta allUnlocked={allUnlocked} onUnlock={handleUnlock} />
      </div>

      <p className="sr-only" role="status">
        {unlockAnnouncement}
      </p>
    </div>
  )
}

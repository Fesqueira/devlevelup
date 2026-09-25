import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../../config'
import { levelUpCopy } from '../../data/levelup'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BoltIcon,
  HeartIcon,
  LockIcon,
} from '../ui/icons'
import { Button } from '../ui/Button'
import { LevelNode } from './LevelNode'
import { cn } from '../../lib/utils'

interface LevelUpPathProps {
  className?: string
}

export function LevelUpPath({ className }: LevelUpPathProps) {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLOListElement>(null)
  const slideRefs = useRef<(HTMLLIElement | null)[]>([])
  const [unlockedCount, setUnlockedCount] = useState(1)
  const [unlockAnnouncement, setUnlockAnnouncement] = useState('')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const allUnlocked = unlockedCount >= levelUpCopy.levels.length

  function updateScrollState() {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 0)
    setCanScrollRight(
      track.scrollLeft < track.scrollWidth - track.clientWidth - 1,
    )
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 0)
    setCanScrollRight(track.scrollWidth > track.clientWidth)
  }, [])

  function scrollToSlide(index: number) {
    const track = trackRef.current
    const slide = slideRefs.current[index]
    if (!track || !slide) return
    if (track.scrollWidth <= track.clientWidth) return
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  function scrollBySlide(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    if (track.scrollWidth <= track.clientWidth) return
    const center = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let nearestDistance = Infinity
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const distance = Math.abs(slideCenter - center)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = index
      }
    })
    const target = Math.min(
      Math.max(nearest + direction, 0),
      levelUpCopy.levels.length - 1,
    )
    scrollToSlide(target)
  }

  function handleUnlock() {
    const next = Math.min(unlockedCount + 1, levelUpCopy.levels.length)
    setUnlockedCount(next)
    scrollToSlide(next - 1)
    const nextLevel = levelUpCopy.levels[next - 1]
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
        {levelUpCopy.levels.map((level, index) => {
          const unlocked = index < unlockedCount
          const current = index === unlockedCount - 1

          const frame = reduceMotion ? (
            <div className="rounded-xl bg-arcade-level-frame p-2">
              <img
                src={level.image}
                alt={level.name}
                loading="lazy"
                className={cn(
                  'size-44 object-contain lg:size-36',
                  !unlocked && 'opacity-40 saturate-50',
                )}
              />
            </div>
          ) : (
            <motion.div
              key={unlocked ? 'unlocked' : 'locked'}
              initial={unlocked ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-xl bg-arcade-level-frame p-2"
            >
              <img
                src={level.image}
                alt={level.name}
                loading="lazy"
                className={cn(
                  'size-44 object-contain lg:size-36',
                  !unlocked && 'opacity-40 saturate-50',
                )}
              />
            </motion.div>
          )

          const lockOverlay = (
            <span className="flex size-12 items-center justify-center rounded-full bg-arcade-level/80 text-arcade-cyan shadow-arcade-badge">
              <LockIcon className="size-6" />
            </span>
          )

          return (
            <Fragment key={level.level}>
              <li
                inert={!unlocked}
                aria-hidden={!unlocked}
                ref={(el) => {
                  slideRefs.current[index] = el
                }}
                className={cn(
                  'relative flex w-[62vw] max-w-64 shrink-0 snap-center flex-col items-center gap-4 overflow-hidden rounded-2xl border p-6 text-center transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 motion-reduce:transform-none lg:w-52 lg:flex-none',
                  current
                    ? 'border-arcade-cyan bg-arcade-comparison-card-active shadow-arcade-card-glow hover:border-arcade-purple-glow hover:shadow-arcade-tier-featured'
                    : 'border-arcade-card-border bg-arcade-comparison-card hover:border-arcade-cyan/60 hover:shadow-arcade-card-glow',
                )}
              >
                {!unlocked && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 bg-arcade-level/60"
                  />
                )}
                <div className="relative flex items-center justify-center">
                  {frame}
                  {!unlocked &&
                    (reduceMotion ? (
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        {lockOverlay}
                      </div>
                    ) : (
                      <AnimatePresence>
                        <motion.div
                          key="lock"
                          initial={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.4 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 z-20 flex items-center justify-center"
                        >
                          {lockOverlay}
                        </motion.div>
                      </AnimatePresence>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <LevelNode
                    label={level.level}
                    unlocked={unlocked}
                    current={current}
                  />
                  {current && (
                    <span className="rounded-full border border-arcade-neon bg-arcade-neon/10 px-3 py-1 font-sora text-[10px] font-semibold uppercase tracking-wider text-arcade-neon">
                      {levelUpCopy.currentLabel}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-base font-bold text-arcade-white">
                    {level.name}
                  </p>
                  <p className="font-sans text-xs leading-4 text-arcade-text-secondary">
                    {level.description}
                  </p>
                </div>
              </li>
              {index < levelUpCopy.levels.length - 1 && (
                <li className="flex shrink-0 items-center justify-center lg:w-16 lg:self-center">
                  <div className="flex w-full items-center justify-center">
                    <span className="flex items-center gap-1 rounded-full bg-arcade-cyan-badge px-2 py-1 font-sora text-[10px] font-bold text-arcade-cyan">
                      <BoltIcon className="size-3" />
                      {levelUpCopy.xpLabel}
                      <ArrowRightIcon className="size-3" />
                    </span>
                  </div>
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scrollBySlide(-1)}
            disabled={!canScrollLeft}
            aria-label={levelUpCopy.prevSlideLabel}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-arcade-icon-border bg-arcade-comparison-card text-arcade-cyan transition-colors hover:border-arcade-cyan/60 hover:bg-arcade-cyan-badge disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBySlide(1)}
            disabled={!canScrollRight}
            aria-label={levelUpCopy.nextSlideLabel}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-arcade-icon-border bg-arcade-comparison-card text-arcade-cyan transition-colors hover:border-arcade-cyan/60 hover:bg-arcade-cyan-badge disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
        {allUnlocked ? (
          <Button
            href={siteConfig.links.apoia}
            target="_blank"
            rel="noreferrer"
            variant="cyan"
            size="lg"
            className="rounded-lg px-8 py-3.5 font-sans text-sm font-bold tracking-[0.04em] shadow-arcade-cta-cyan-lg after:hidden"
          >
            <HeartIcon className="size-4" />
            {levelUpCopy.unlockCompleteCta}
          </Button>
        ) : (
          <Button
            variant="cyan"
            size="lg"
            onClick={handleUnlock}
            className="rounded-lg px-8 py-3.5 font-sans text-sm font-bold tracking-[0.04em] shadow-arcade-cta-cyan-lg after:hidden"
          >
            <BoltIcon className="size-4 text-arcade-yellow" />
            {levelUpCopy.unlockCta}
          </Button>
        )}
      </div>

      <p className="sr-only" role="status">
        {unlockAnnouncement}
      </p>
    </div>
  )
}

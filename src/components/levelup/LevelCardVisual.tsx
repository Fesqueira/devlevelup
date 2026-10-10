import { AnimatePresence, motion } from 'framer-motion'
import type { LevelData } from '../../data/levelup'
import { LockIcon } from '../ui/icons'
import { cn } from '../../lib/utils'

interface LevelCardVisualProps {
  level: LevelData
  unlocked: boolean
  reduceMotion: boolean
}

export function LevelCardVisual({
  level,
  unlocked,
  reduceMotion,
}: LevelCardVisualProps) {
  const imageClass = cn(
    'size-44 object-contain lg:size-36',
    !unlocked && 'opacity-40 saturate-50',
  )

  const lockOverlay = (
    <span className="flex size-12 items-center justify-center rounded-full bg-arcade-level/80 text-arcade-cyan shadow-arcade-badge">
      <LockIcon className="size-6" />
    </span>
  )

  return (
    <div className="relative flex items-center justify-center">
      {reduceMotion ? (
        <div className="rounded-xl bg-arcade-level-frame p-2">
          <img
            src={level.image}
            alt={level.name}
            loading="lazy"
            className={imageClass}
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
            className={imageClass}
          />
        </motion.div>
      )}

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
  )
}

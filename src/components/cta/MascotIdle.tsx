import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { mascotIdleFrames } from '../../data/mascotIdle'
import { cn } from '../../lib/utils'

interface MascotIdleProps {
  alt?: string
  className?: string
}

const FRAME_MS = 150

export function MascotIdle({ alt = '', className }: MascotIdleProps) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % mascotIdleFrames.length),
      FRAME_MS,
    )
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <motion.div
      className={cn('shrink-0', className)}
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={mascotIdleFrames[index]}
          src={mascotIdleFrames[index]}
          alt={alt}
          className="size-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.06 }}
        />
      </AnimatePresence>
    </motion.div>
  )
}

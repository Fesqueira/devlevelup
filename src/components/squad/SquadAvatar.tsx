import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface SquadAvatarProps {
  frames: readonly string[]
  alt: string
  className?: string
}

const FRAME_MS = 400
// Sequência de teste: 1→2→3→4→2→1 (sem o segundo 3)
const SEQUENCE = [0, 1, 2, 3, 1, 0]

function sequenceTiming(index: number, sequence: readonly number[]) {
  const slots = sequence.length
  const slotSet = new Set(
    sequence.flatMap((frame, slot) => (frame === index ? [slot] : [])),
  )
  const windows: [number, number][] = [...slotSet]
    .sort((a, b) => a - b)
    .map((slot) => [slot / slots, (slot + 1) / slots])
  const merged: [number, number][] = []
  for (const [start, end] of windows) {
    const last = merged[merged.length - 1]
    if (last && start <= last[1]) last[1] = Math.max(last[1], end)
    else merged.push([start, end])
  }
  const boundaries = [...new Set([0, 1, ...merged.flat()])].sort(
    (a, b) => a - b,
  )
  const times = boundaries.flatMap((b, i) =>
    i === 0 || i === boundaries.length - 1 ? [b] : [b, b],
  )
  const values = boundaries.slice(0, -1).flatMap((b) => {
    const on = merged.some(([a, c]) => b >= a && b < c) ? 1 : 0
    return [on, on]
  })
  return { times, values }
}

export function SquadAvatar({ frames, alt, className }: SquadAvatarProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion || frames.length < 2) {
    return (
      <img
        src={frames[0]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('object-contain', className)}
      />
    )
  }

  const totalMs = FRAME_MS * SEQUENCE.length

  return (
    <div className={cn('relative', className)}>
      {frames.map((frame, index) => {
        const { times, values } = sequenceTiming(index, SEQUENCE)
        return (
          <motion.img
            key={frame}
            src={frame}
            alt={index === 0 ? alt : ''}
            aria-hidden={index !== 0}
            loading="lazy"
            decoding="async"
            initial={false}
            animate={{ opacity: values }}
            transition={{
              duration: totalMs / 1000,
              times,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 h-full w-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        )
      })}
    </div>
  )
}

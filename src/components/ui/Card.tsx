import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border border-arcade-800 bg-arcade-900 p-4 text-arcade-muted',
        className,
      )}
      {...props}
    />
  )
}

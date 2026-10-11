import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Glow } from './Glow'
import { Starfield } from './Starfield'

interface ScreenShellProps {
  children: ReactNode
  className?: string
}

export function ScreenShell({ children, className }: ScreenShellProps) {
  return (
    <main
      data-theme="dark"
      className={cn(
        'relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-arcade-background px-6 py-16 text-arcade-white',
        className,
      )}
    >
      <Starfield />
      <Glow
        tone="cyan"
        opacity={10}
        blur={75}
        className="-top-24 left-1/2 size-96 -translate-x-1/2"
      />
      <Glow
        tone="purple"
        opacity={10}
        blur={75}
        className="-bottom-24 right-0 size-80"
      />
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        {children}
      </div>
    </main>
  )
}

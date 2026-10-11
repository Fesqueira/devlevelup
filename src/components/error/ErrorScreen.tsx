import { useEffect, useRef, type ReactNode } from 'react'
import { ScreenShell } from '../ui/ScreenShell'

interface ErrorScreenProps {
  code: string
  title: string
  description: string
  icon?: ReactNode
  className?: string
  children?: ReactNode
}

export function ErrorScreen({
  code,
  title,
  description,
  icon,
  className,
  children,
}: ErrorScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <ScreenShell className={className}>
      {icon}
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="flex flex-col items-center gap-4 outline-none"
      >
        <span
          aria-hidden="true"
          className="font-pixel text-5xl text-arcade-cyan text-shadow-arcade-title sm:text-6xl"
        >
          {code}
        </span>
        <span className="font-display text-2xl font-bold text-arcade-white sm:text-3xl">
          {title}
        </span>
      </h1>
      <p className="max-w-xl text-sm leading-relaxed text-arcade-muted sm:text-base">
        {description}
      </p>
      {children ? (
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {children}
        </div>
      ) : null}
    </ScreenShell>
  )
}

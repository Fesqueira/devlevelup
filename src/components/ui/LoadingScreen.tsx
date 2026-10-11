import { PixelSpinnerIcon } from './icons'
import { ScreenShell } from './ScreenShell'

interface LoadingScreenProps {
  className?: string
}

export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <ScreenShell className={className}>
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-5"
      >
        <PixelSpinnerIcon className="size-14 animate-pixel-spin text-arcade-cyan motion-reduce:animate-none" />
        <p className="font-pixel text-xs tracking-[0.18em] text-arcade-ghost">
          CARREGANDO…
        </p>
      </div>
    </ScreenShell>
  )
}

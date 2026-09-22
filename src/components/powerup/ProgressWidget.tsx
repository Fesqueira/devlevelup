import { cn } from '../../lib/utils'

interface ProgressWidgetProps {
  amount: string
  amountLabel: string
  meta: string
  level: string
  fillPercent: number
  note: string
  className?: string
}

export function ProgressWidget({
  amount,
  amountLabel,
  meta,
  level,
  fillPercent,
  note,
  className,
}: ProgressWidgetProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-6 rounded-2xl border border-arcade-nav-border bg-arcade-powerup-card p-8 shadow-arcade-powerup-card backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="font-pixel text-[28px] leading-7 text-arcade-cyan text-shadow-arcade-powerup">
            {amount}
          </p>
          <p className="font-roboto-flex text-sm font-medium leading-4 text-arcade-footer-text">
            {amountLabel}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-inter text-base font-medium leading-5 text-arcade-footer-text">
            {meta}
          </p>
          <span className="rounded-full border border-arcade-purple-glow bg-arcade-purple-badge px-2.5 py-1.5 font-inter text-xs font-bold uppercase tracking-wider text-arcade-purple-glow">
            {level}
          </span>
        </div>
      </div>

      <div className="h-4 w-full rounded-lg bg-arcade-powerup-track">
        <div
          className="h-full rounded-lg bg-gradient-to-r from-arcade-cyan to-arcade-purple-glow shadow-arcade-progress-fill"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      <p className="font-roboto-flex text-sm font-medium leading-6 text-arcade-footer-text">
        {note}
      </p>
    </div>
  )
}

import { cn } from '../../lib/utils'

interface SquadTooltipProps {
  id: string
  title: string
  items: readonly string[]
  className?: string
}

export function SquadTooltip({
  id,
  title,
  items,
  className,
}: SquadTooltipProps) {
  return (
    <div
      id={id}
      role="tooltip"
      className={cn(
        'pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-50 w-57 origin-bottom -translate-x-1/2 rounded-2xl border border-arcade-tooltip-border bg-arcade-tooltip px-4.5 py-4 shadow-arcade-tooltip backdrop-blur-md animate-tooltip-enter motion-reduce:animate-none',
        className,
      )}
    >
      <p className="mb-2.5 font-sora text-[10px] font-bold tracking-[0.08em] text-arcade-cyan">
        {title}
      </p>
      <ul className="flex flex-col gap-1.75">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-0.5 flex-none text-[9px] text-arcade-cyan"
            >
              ▸
            </span>
            <span className="font-roboto-flex text-xs leading-[1.45] text-arcade-footer-text">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

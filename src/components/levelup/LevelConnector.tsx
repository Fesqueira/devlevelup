import { levelUpCopy } from '../../data/levelup'
import { ArrowRightIcon, BoltIcon } from '../ui/icons'

export function LevelConnector() {
  return (
    <li className="flex shrink-0 items-center justify-center lg:w-16 lg:self-center">
      <div className="flex w-full items-center justify-center">
        <span className="flex items-center gap-1 rounded-full bg-arcade-cyan-badge px-2 py-1 font-sora text-[10px] font-bold text-arcade-cyan">
          <BoltIcon className="size-3" />
          {levelUpCopy.xpLabel}
          <ArrowRightIcon className="size-3" />
        </span>
      </div>
    </li>
  )
}

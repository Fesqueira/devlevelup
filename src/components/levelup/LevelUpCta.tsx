import { siteConfig } from '../../config'
import { levelUpCopy } from '../../data/levelup'
import { Button } from '../ui/Button'
import { BoltIcon, HeartIcon } from '../ui/icons'

interface LevelUpCtaProps {
  allUnlocked: boolean
  onUnlock: () => void
}

const ctaClass =
  'rounded-lg px-8 py-3.5 font-sans text-sm font-bold tracking-[0.04em] shadow-arcade-cta-cyan-lg after:hidden'

export function LevelUpCta({ allUnlocked, onUnlock }: LevelUpCtaProps) {
  if (allUnlocked) {
    return (
      <Button
        href={siteConfig.links.apoia}
        target="_blank"
        rel="noreferrer"
        variant="cyan"
        size="lg"
        className={ctaClass}
      >
        <HeartIcon className="size-4" />
        {levelUpCopy.unlockCompleteCta}
      </Button>
    )
  }

  return (
    <Button variant="cyan" size="lg" onClick={onUnlock} className={ctaClass}>
      <BoltIcon className="size-4 text-arcade-yellow" />
      {levelUpCopy.unlockCta}
    </Button>
  )
}

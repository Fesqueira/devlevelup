import { Fragment } from 'react'
import { heroCopy } from '../../data/hero'
import { cn } from '../../lib/utils'

interface HeroTitleProps {
  className?: string
}

export function HeroTitle({ className }: HeroTitleProps) {
  return (
    <h1
      className={cn(
        // clamp mantém as 2 linhas em qualquer tela: 72px = paddings do painel, 21 = chars da linha maior
        'font-pixel text-[clamp(11px,calc((100vw_-_72px)/21),26px)] uppercase leading-[1.4] whitespace-nowrap text-arcade-footer-heading text-shadow-arcade-title',
        className,
      )}
    >
      {heroCopy.titleLines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          <span className={cn(index > 0 && 'text-arcade-cyan')}>{line}</span>
        </Fragment>
      ))}
    </h1>
  )
}

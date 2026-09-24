import { SouJuniorMark, SouJuniorWordmark } from '../ui/icons'
import { cn } from '../../lib/utils'

interface FooterBrandProps {
  className?: string
}

export function FooterBrand({ className }: FooterBrandProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <span className="flex items-center gap-3">
        <SouJuniorMark className="size-8 text-arcade-white" />
        <SouJuniorWordmark className="h-4.25 w-auto text-arcade-white" />
      </span>
      <p className="font-sans text-sm leading-[1.57] text-arcade-footer-text">
        {
          'Aceleração profissional de juniores na tecnologia por meio de projetos reais e squads colaborativas.'
        }
      </p>
      <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-arcade-cyan px-2.5 py-1">
        <span className="font-sora text-xs font-bold text-arcade-cyan">
          {'[ECOSSISTEMA OPEN-SOURCE]'}
        </span>
      </span>
    </div>
  )
}

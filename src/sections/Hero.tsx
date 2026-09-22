import { Fragment } from 'react'
import { Button } from '../components/ui/Button'
import { HeartIcon, PlayIcon } from '../components/ui/icons'
import { siteConfig } from '../config'
import { cn } from '../lib/utils'

interface HeroProps {
  className?: string
}

const stats = [
  { value: '+1200', label: 'Pessoas Apoiadas' },
  { value: '+1660', label: 'Projetos Entregues' },
  { value: '+360', label: 'Comunidade' },
] as const

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-arcade-background px-6 py-16 lg:flex-row lg:gap-10 lg:px-20 lg:py-18',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-36 h-100 w-150 rounded-full bg-arcade-glow opacity-50 blur-3xl"
      />

      <div className="flex w-full flex-col gap-7 lg:w-155">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 bg-arcade-cyan" />
          <p className="font-inter text-[11px] font-bold uppercase tracking-[0.08em] text-arcade-cyan">
            {'Financiamento coletivo'}
          </p>
          <span aria-hidden="true" className="h-0.5 w-6 bg-arcade-cyan" />
        </div>

        <h1 className="font-pixel text-2xl leading-[1.1] text-arcade-cyan text-shadow-arcade-title sm:text-3xl lg:text-[46px]">
          {'Pequenos Apoios,'}
          <br />
          {'Grandes Oportunidades'}
        </h1>

        <p className="font-roboto-flex text-base leading-[1.6] text-arcade-text-secondary">
          {
            'A SouJunior acelera a carreira de profissionais de tecnologia em início de carreira através de squads práticas, simulação de ambiente de mercado real e mentorias de alto nível. Seu apoio a partir de R$ 2,00 viabiliza a infraestrutura de servidores, ferramentas e licenças para manter o ecossistema rodando.'
          }
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            href={siteConfig.links.apoia}
            variant="cta"
            size="lg"
            className="rounded-md px-7 py-3.5 font-inter tracking-[0.04em] shadow-arcade-cta after:hidden"
          >
            <HeartIcon className="size-4" />
            {'Apoiar a SouJunior'}
          </Button>
          <Button
            href="#jornada"
            variant="secondary"
            size="lg"
            className="rounded-md border-2 px-6 py-3.25 font-inter tracking-[0.04em] after:hidden"
          >
            <PlayIcon className="size-4" />
            {'Ver Jornada de Evolução'}
          </Button>
        </div>

        <div className="flex items-center gap-6">
          {stats.map((stat, index) => (
            <Fragment key={stat.value}>
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="h-9 w-px bg-arcade-divider"
                />
              )}
              <div className="flex flex-col gap-0.5">
                <span className="font-inter text-xl font-extrabold text-arcade-cyan">
                  {stat.value}
                </span>
                <span className="font-inter text-[11px] text-arcade-text-secondary">
                  {stat.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-155 lg:w-155">
        <div className="relative aspect-620/460 overflow-hidden rounded-xl">
          <img
            src="/images/rpg-scene.png"
            alt="Cena de jogo RPG com personagens da comunidade SouJunior"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-arcade-scene-overlay"
          />
        </div>

        <div className="absolute left-10 top-7.5 flex items-center gap-1.5 rounded-full bg-arcade-cta-text px-4 py-2 shadow-arcade-badge ring-2 ring-arcade-cyan">
          <span className="font-inter text-[11px] font-extrabold text-arcade-yellow">
            {'⭐ +XP'}
          </span>
          <span className="font-inter text-[10px] font-semibold text-arcade-cyan">
            {'SQUAD'}
          </span>
        </div>

        <div className="absolute bottom-5 right-5 flex w-30 flex-col items-center gap-0.5 rounded-lg bg-arcade-level py-2 shadow-arcade-level ring-2 ring-arcade-yellow">
          <span className="font-inter text-[10px] font-bold uppercase text-arcade-yellow">
            {'Nível'}
          </span>
          <span className="font-inter text-[22px] font-black leading-none text-arcade-white">
            {'MAX'}
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-arcade-cyan opacity-40"
      />
    </section>
  )
}

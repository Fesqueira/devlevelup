import { siteConfig } from '../../config'
import { ctaCopy } from '../../data/cta'
import { cn } from '../../lib/utils'
import { Mascot } from '../ui/Mascot'

interface CtaBannerProps {
  className?: string
}

export function CtaBanner({ className }: CtaBannerProps) {
  return (
    <div
      className={cn(
        'relative isolate flex w-full justify-center bg-arcade-footer',
        className,
      )}
    >
      <div className="relative mx-auto flex h-40 w-full max-w-360 flex-col items-center justify-center px-4 lg:px-0">
        <div
          className="pointer-events-none absolute z-0 hidden lg:block"
          style={{
            width: '60px',
            height: '60px',
            left: '998px',
            top: '50px',
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(51, 230, 255, 0.5) 0%, rgba(0, 179, 217, 0.2) 50%, rgba(0, 128, 179, 0) 100%)',
            filter: 'blur(9px)',
          }}
        />
        <div className="relative z-10 box-border flex w-full max-w-328 flex-col items-center gap-6 rounded-2xl border border-white/8 bg-white/3 px-6 py-6 lg:h-32 lg:flex-row lg:justify-between lg:gap-12 lg:px-10">
          <h2 className="max-w-160 font-display text-xl font-semibold leading-7 text-arcade-white sm:text-[20px]">
            {ctaCopy.titleBefore}{' '}
            <span className="text-arcade-cyan">{ctaCopy.titleHighlight}</span>{' '}
            {ctaCopy.titleAfter}
          </h2>

          <div className="flex flex-none items-center justify-center gap-6">
            <Mascot
              src="/images/mascote-apontando.webp"
              alt={ctaCopy.mascotAlt}
              className="size-16 shrink-0 sm:size-20"
            />
            <a
              href={siteConfig.links.apoia}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-61 items-center justify-center rounded-lg bg-arcade-cyan px-6 py-3.5 font-sans text-base font-bold leading-5 text-arcade-950 shadow-arcade-cta-cyan-lg transition-colors hover:bg-arcade-secondary"
            >
              {ctaCopy.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

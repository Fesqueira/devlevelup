import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import { cn } from '../../lib/utils'

interface HeroParallaxBackgroundProps {
  className?: string
  disabled?: boolean
}

export function HeroParallaxBackground({
  className,
  disabled = false,
}: HeroParallaxBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 overflow-hidden', className)}
    >
      <ParallaxBanner className="h-full w-full" disabled={disabled}>
        <ParallaxBannerLayer speed={-30} easing="easeOut">
          <img
            src="/images/hero/fundo.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top-right"
          />
        </ParallaxBannerLayer>
        <ParallaxBannerLayer speed={-5} easing="easeOut">
          <img
            src="/images/hero/plano-frontal.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-bottom-right"
          />
        </ParallaxBannerLayer>
      </ParallaxBanner>
      <div className="absolute inset-0 bg-arcade-scene-overlay lg:bg-hero-scrim" />
    </div>
  )
}

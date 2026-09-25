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
          <picture className="block h-full w-full">
            <source
              srcSet="/images/personagens-parallax/fundo.webp"
              type="image/webp"
            />
            <img
              src="/images/personagens-parallax/fundo.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </picture>
        </ParallaxBannerLayer>
        <ParallaxBannerLayer speed={-5} easing="easeOut">
          <picture className="block h-full w-full">
            <source
              srcSet="/images/personagens-parallax/plano-frontal.webp"
              type="image/webp"
            />
            <img
              src="/images/personagens-parallax/plano-frontal.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </picture>
        </ParallaxBannerLayer>
      </ParallaxBanner>
      <div className="absolute inset-0 bg-arcade-scene-overlay lg:bg-hero-scrim" />
    </div>
  )
}

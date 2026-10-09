import { lazy, Suspense, useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { SectionFallback } from './components/ui/SectionFallback'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { Comparison } from './sections/Comparison'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { HeroParallax } from './sections/HeroParallax'
import { Impact } from './sections/Impact'
import { PowerUp } from './sections/PowerUp'
import { Voices } from './sections/Voices'

// LevelUp e Squad são as únicas seções que usam framer-motion e ficam abaixo
// da dobra: carregá-las sob demanda tira a lib do bundle inicial.
const loadLevelUp = () =>
  import('./sections/LevelUp').then((m) => ({ default: m.LevelUp }))
const loadSquad = () =>
  import('./sections/Squad').then((m) => ({ default: m.Squad }))

const LevelUp = lazy(loadLevelUp)
const Squad = lazy(loadSquad)

function preloadLazySections() {
  void loadLevelUp()
  void loadSquad()
}

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preloadLazySections)
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(preloadLazySections, 2000)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <ParallaxProvider isDisabled={prefersReducedMotion}>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <HeroParallax />
        <Comparison />
        <Suspense fallback={<SectionFallback id="jornada" />}>
          <LevelUp />
        </Suspense>
        <CTA />
        <Suspense fallback={<SectionFallback id="squads" />}>
          <Squad />
        </Suspense>
        <Impact />
        <Voices />
        <PowerUp />
        <Footer />
      </div>
    </ParallaxProvider>
  )
}

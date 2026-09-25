import { ParallaxProvider } from 'react-scroll-parallax'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { Comparison } from './sections/Comparison'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { HeroParallax } from './sections/HeroParallax'
import { Impact } from './sections/Impact'
import { LevelUp } from './sections/LevelUp'
import { PowerUp } from './sections/PowerUp'
import { Squad } from './sections/Squad'
import { Voices } from './sections/Voices'
import { Reveal } from './components/ui/Reveal'

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <ParallaxProvider isDisabled={prefersReducedMotion}>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <HeroParallax />
        <Comparison />
        <LevelUp />
        <CTA />
        <Squad />
        <Impact />
        <Voices />
        <PowerUp />
        <Footer />
      </div>
    </ParallaxProvider>
  )
}

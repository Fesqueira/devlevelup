import { Comparison } from './sections/Comparison'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Impact } from './sections/Impact'
import { LevelUp } from './sections/LevelUp'
import { Squad } from './sections/Squad'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Comparison />
      <LevelUp />
      <CTA />
      <Squad />
      <Impact />
      <Footer />
    </div>
  )
}

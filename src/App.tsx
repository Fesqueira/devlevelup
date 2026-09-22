import { Comparison } from './sections/Comparison'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Impact } from './sections/Impact'
import { LevelUp } from './sections/LevelUp'
import { PowerUp } from './sections/PowerUp'
import { Squad } from './sections/Squad'
import { Voices } from './sections/Voices'

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
      <Voices />
      <PowerUp />
      <Footer />
    </div>
  )
}

import { lazy, Suspense } from 'react'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { usePathname } from './hooks/usePathname'
import { NotFound } from './pages/NotFound'

const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((module) => ({
    default: module.LandingPage,
  })),
)

export default function App() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === ''

  if (!isHome) {
    return <NotFound />
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <LandingPage />
    </Suspense>
  )
}

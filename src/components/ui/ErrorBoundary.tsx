import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />
    }
    return this.props.children
  }
}

function DefaultFallback() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-arcade-background px-4 text-center">
      <p className="font-pixel text-sm text-arcade-primary text-shadow-arcade-title">
        GAME OVER
      </p>
      <h1 className="font-display text-2xl font-bold text-arcade-white">
        Um erro inesperado derrubou o nível
      </h1>
      <p className="max-w-md text-sm text-arcade-muted">
        Algo deu errado ao carregar a página. Recarregue para tentar de novo.
      </p>
      <Button variant="cta" onClick={() => window.location.reload()}>
        Reiniciar
      </Button>
    </main>
  )
}

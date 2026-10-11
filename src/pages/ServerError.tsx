import { ErrorScreen } from '../components/error/ErrorScreen'
import { Button } from '../components/ui/Button'
import { AlertIcon } from '../components/ui/icons'
import { siteConfig } from '../config'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ServerError() {
  useDocumentTitle(`500 — ${siteConfig.name}`)

  return (
    <ErrorScreen
      code="500"
      title="Erro no servidor"
      description="Algo travou no meio da fase. Recarregue a página para tentar de novo — se persistir, volte ao início."
      icon={<AlertIcon className="size-12 text-arcade-primary" />}
    >
      <Button
        type="button"
        variant="cyan"
        size="lg"
        onClick={() => window.location.reload()}
      >
        Recarregar
      </Button>
      <Button href="/" target="_self" variant="secondary" size="lg">
        Voltar ao início
      </Button>
    </ErrorScreen>
  )
}

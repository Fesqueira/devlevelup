import { ErrorScreen } from '../components/error/ErrorScreen'
import { Button } from '../components/ui/Button'
import { GhostIcon } from '../components/ui/icons'
import { siteConfig } from '../config'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle(`404 — ${siteConfig.name}`)

  return (
    <ErrorScreen
      code="404"
      title="Área desconhecida"
      description="Aqui só existe névoa e o eco de um bug antigo. O início te espera."
      icon={<GhostIcon className="size-12 text-arcade-cyan" />}
    >
      <Button href="/" target="_self" variant="cyan" size="lg">
        Voltar ao início
      </Button>
    </ErrorScreen>
  )
}

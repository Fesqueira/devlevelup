---
name: componentes
description: Use ao criar ou refatorar componentes no DevLevelUp. Documenta nomenclatura, estrutura (sections vs components/ui), named exports e cn().
---

# Componentes

Guia rápido de como estruturar componentes no DevLevelUp. Detalhes em `docs/padrao-componentes.md`.

## Onde colocar

- `src/sections/` — **seções de layout da LP** (Hero, CTA, Footer). Um arquivo por seção, exportando só componentes.
- `src/components/ui/` — **primitivos reutilizáveis** (Button, Card…). Genéricos: sem texto/links de domínio fixo.
- Dados de apoio das seções → `src/data/`; metadata → `src/config.ts`.

## Estrutura mínima de um primitivo

```tsx
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], className)}
      {...props}
    />
  )
}

const base = 'font-display inline-flex items-center gap-2'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-arcade-primary text-arcade-950 hover:bg-arcade-secondary',
  secondary: 'border border-arcade-secondary text-arcade-secondary',
  ghost: 'text-arcade-muted hover:text-arcade-ghost',
}
```

## Regras

1. Um componente = um arquivo `PascalCase.tsx` com named export.
2. Estilos repetidos em 2+ lugares → subir para um primitivo `ui/`, token ou constante — não duplicar.
3. Toda classe usa tokens do `@theme`; sem hex/font hardcoded.
4. Rodar `npm run format` antes de terminar.
5. **Ícones SVG nunca inline** em componentes/seções — criar em `src/components/ui/icons.tsx` com named export e `className?: string` (tamanho/cor controlados pelo consumidor via `className`; cor via `currentColor`).

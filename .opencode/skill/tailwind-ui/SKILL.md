---
name: tailwind-ui
description: Use quando for escrever classes/layout/estilo do DevLevelUp com Tailwind v4. Cobre @theme, tokens arcade, cn() e classes utilitárias.
---

# Tailwind UI

O projeto usa **Tailwind CSS v4** (utilitário-first, via plugin do Vite). Cores e fontes vêm **exclusivamente** dos tokens em `src/index.css`.

## Tokens disponíveis (`@theme`)

- Fontes: `font-sans` (Funnel Sans), `font-display` (Funnel Display).
- Cores `--color-arcade-*`: `950/900/800/700` (fundos), `muted`, `ghost`, `primary`, `secondary`, `accent`, `neon`.

Exemplos de uso:

```tsx
className = 'bg-arcade-900 font-display text-arcade-muted'
className = 'text-arcade-primary hover:text-arcade-secondary'
```

## Regras

- **Proibido** hex/rgb/nome de cor hardcoded e `font-family` inline — sempre token.
- Mescle classes do chamador com `cn()` (clsx + tailwind-merge) para resolver conflito (o último merge vence a propriedade duplicada).
- Não use `@apply` fora do necessário; prefira classes nos componentes.
- Animações/transições: use `transition-*` utilitárias; para o arcade, prefira `transition-colors`/`ease-in-out` sem exagero.
- Se uma nova cor/estilo for necessária mais de uma vez: **adicionar token no `@theme`** em vez de utilitar arbitraria repetida.

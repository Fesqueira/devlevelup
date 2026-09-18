---
name: react
description: Use quando for implementar ou corrigir componentes/hooks React no DevLevelUp. Cobre React 19, hooks, composição e regras do eslint-plugin-react-hooks.
---

# React

Padrões React 19 do projeto (ver `docs/padrao-componentes.md` e `AGENTS.md`).

## Componentes

- Arquivos `PascalCase.tsx`, **named export** (`export function Hero(...)`). Evite default export e `React.FC`.
- Props tipadas com interface `XxxProps`; componentes de botão/form estendem a interface HTML correspondente (`ButtonHTMLAttributes`, `InputHTMLAttributes`…).
- Aceite sempre `className?: string` e mescle com `cn()`.
- Em React 19, `ref` pode vir como prop normal (sem `forwardRef`) quando precisar.

## Hooks

- Nome `useXxx.ts` em `src/hooks/`, exportado como named export.
- Respeite as regras do `eslint-plugin-react-hooks` Lint:
  - Hooks só no topo (sem condicional/loop) — `rules-of-hooks`.
  - `useEffect`/`useMemo`/`useCallback` com dependências corretas — `exhaustive-deps`.

## Composición

- Seções em `src/sections/` são montadas em `App.tsx`, na ordem da página.
- Onde a seção precisa de subpartes, crie componente separado; `sections/` não exporta constantes/funções (react-refresh).
- Estado compartilhado entre seções: comece simples (prop drilling) e só suba para contexto/gligação se necessário.

## Lints que disparam com frequência

- `react-refresh/only-export-components` → mover export não-componente para `src/data/` ou outro arquivo.
- `react-hooks/…` (v7) → corrigir conforme a mensagem; não desative a regra.

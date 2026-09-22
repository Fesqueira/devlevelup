# AGENTS.md — Regras do projeto DevLevelUp

Guia de regras para agentes/IA e devs trabalharem neste repo. Stack: Vite + React 19 + TS + Tailwind v4 · fork + PRs · sem testes automatizados por enquanto.

## Comandos

```bash
npm run dev          # dev server
npm run build        # typecheck + build
npm run lint         # eslint
npm run format       # prettier --write
npm run format:check # prettier --check (CI)
npm run preview      # serve build
```

Sempre rodar `lint` + `format:check` + `build` antes de terminar uma tarefa.

## Branches

- `main` = produção (deploy automático na Vercel)
- `feature/*` — nova funcionalidade/seção
- `fix/*` — correção
- `chore/*` — tarefa interna (infra, tooling)

Trabalhar sempre a partir de `main` atualizado, nunca commit direto em `main`.

## Commits

Conventional Commits:

- `feat(escopo): mensagem` — nova feature (ex.: `feat(hero): adiciona grid de requisitos`)
- `fix(escopo): mensagem`
- `chore(escopo): mensagem` — tooling/infra
- `refactor(escopo): mensagem`

Mensagens em português, descritivas. Um commit = uma mudança coesa.

## Nomenclatura

- Componentes: `PascalCase.tsx` (ex.: `Button.tsx`, `Hero.tsx`)
- Hooks: `useXxx.ts` (ex.: `useMediaQuery.ts`)
- Utils/lib: `kebab-case.ts` (ex.: `lib/utils.ts`)
- Seções do layout: `src/sections/`
- Componentes reutilizáveis/primitivos: `src/components/ui/`
- Dados estáticos: `src/data/`
- Metadata do projeto: `src/config.ts` (`siteConfig`)

## Estilo de código

- Prettier (`.prettierrc`): sem `;`, aspas simples, trailing comma
- Utilidades com conflito de classe: usar `cn()` de `src/lib/utils.ts`
- Usar tokens do Tailwind `@theme` (`--color-arcade-*`, `--font-sans`/`--font-display`), **não** cores/fontes hardcoded
- Ícones SVG: **nunca inline** em componentes/seções — criar em `src/components/ui/icons.tsx` com named export e `className?: string`
- `sections/` exportam só componentes (regra react-refresh) — constantes/variants fora do arquivo ou em `src/data/`

## Dependências

- Novo pacote **sempre** via PR revisado, nunca commit direto na branch de trabalho isolado
- Runtime (usado em produção) → `dependencies`; tooling/lint/format → `devDependencies`
- Sempre commitar `package-lock.json`

## Pull requests / review

- PR mínimo 1 reviewer; QA veta/libera cada PR via preview da Vercel
- PR final mergeado em `main` com **squash**
- Checklist no PR: QA ok no preview + `lint` + `format:check` + `build` verdes

## Docs

- `docs/arquitetura.md`, `docs/padrao-componentes.md`, `docs/git-branches.md` detalham as convenções

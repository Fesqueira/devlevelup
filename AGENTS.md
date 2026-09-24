# AGENTS.md — Regras do projeto DevLevelUp

Guia de regras para agentes/IA e devs trabalharem neste repo. Stack: Vite + React 19 + TS + Tailwind v4 · Gitflow + PRs · sem testes automatizados por enquanto.

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

Fluxo **Gitflow clássico** (detalhes em `docs/git-branches.md`):

- `main` — produção (deploy automático na Vercel); sempre taggável (`vX.Y.Z`)
- `develop` — integração; base para features e destino padrão dos PRs
- `feature/*` — nova funcionalidade/seção (ex.: `feature/hero`)
- `fix/*` — correção (ex.: `fix/css-blur-em-mobile`)
- `chore/*` — tarefa interna/infra (ex.: `chore/ci-lint`)
- `release/vX.Y.Z` — preparação de release, criada de `develop`; merge em `main` + volta para `develop`
- `hotfix/*` — correção urgente de produção, criada de `main`; merge em `main` + volta para `develop`

Regras:

- Nunca commit direto em `main` (produção) — só via `release/*`/`hotfix/*` com PR, merge `--no-ff` e tag semver.
- `feature/*`, `fix/*` e `chore/*` sempre abrem PR para `develop` (merge com **squash**).
- `release/*` e `hotfix/*` abrem PR para `main` (com tag semver) e depois são mesclados de volta em `develop`.
- Merge em `develop` com **squash**; merge de `release/*`/`hotfix/*` em `main` com **merge --no-ff** (preserva o ponto de release).

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
- `feature/*`, `fix/*` e `chore/*` → PR para `develop` (merge com **squash**) — fluxo padrão para todas as entregas
- `release/*` e `hotfix/*` → PR para `main` (merge com **--no-ff** + tag semver) e volta para `develop`
- Checklist no PR: QA ok no preview + `lint` + `format:check` + `build` verdes

## Docs

- `docs/arquitetura.md`, `docs/padrao-componentes.md`, `docs/git-branches.md` detalham as convenções

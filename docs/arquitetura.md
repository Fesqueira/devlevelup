# Arquitetura — DevLevelUp

Documento de arquitetura do repo. Resumo das regras no `AGENTS.md`.

## Visão geral

Landing page (LP) de estética 16 bits / dark arcade feita para o Hackathon SouJunior.
Campanha de apoio via [Apoia.se](https://apoia.se/soujunior).

Spot: **Vite + React 19 + TypeScript + Tailwind CSS v4** (só client-side, sem SSR).

## Estrutura de `src/`

```
src/
├── App.tsx          # roteador mínimo: "/" → LandingPage (lazy); demais → NotFound
├── main.tsx         # bootstrap React + ErrorBoundary
├── index.css        # tokens do Tailwind (@theme) + base
├── config.ts        # metadata do projeto (siteConfig)
├── pages/           # telas inteiras (LandingPage, NotFound, ServerError)
├── sections/        # seções da LP (Hero, CTA, Footer)
├── components/
│   ├── ui/          # primitivos reutilizáveis (Button, Card, ScreenShell)
│   ├── error/       # subcomponentes das telas de erro (ErrorScreen)
│   └── footer/      # subcomponentes do Footer (FooterBrand, FooterSocial)
├── hooks/           # hooks customizados (usePathname.ts, useDocumentTitle.ts)
├── lib/             # utils (cn(), etc.)
└── data/            # dados estáticos das seções
```

### Como os arquivos se comunicam

- `main.tsx` → importa `App.tsx` (e `index.css`), envolvendo o app em `<ErrorBoundary />`.
- `App.tsx` → lê a rota atual com `usePathname()` e renderiza `LandingPage` (lazy) para `/` ou `NotFound` para qualquer outra rota; `<Suspense fallback={<LoadingScreen />}>` cobre o carregamento do chunk.
- `pages/` → telas inteiras; `components/error/` tem o layout `ErrorScreen`; `components/ui/ErrorBoundary` captura erro de render e mostra `ServerError`.
- `sections/` → usam `components/ui/*`, `components/<feature>/*` e dados de `data/`.
- `components/ui/*` → primitivos genéricos; usam `cn()` de `lib/utils.ts` para mesclar classes.
- `components/<feature>/*` → subcomponentes específicos de uma seção/tela (ex.: `components/error/`); usam `cn()` e tokens do `@theme`.
- Cores/fontes vêm **só** dos tokens de `index.css` (`@theme`), nunca hardcoded.

### Rotas e telas de erro

- `/` (ou vazio) → LP; qualquer outra rota → **404** (`NotFound`).
- Erro de render (React) → **500** (`ServerError` via `ErrorBoundary`).
- **Loading**: splash em HTML/CSS inline em `index.html` cobre o primeiro paint; `LoadingScreen` (React) é o fallback de `Suspense` e o visual idêntico torna a troca fluida.
- **Vercel**: `rewrites` catch-all → `/index.html` garante o fallback SPA (soft 404, HTTP 200). Telas de loading/erro são sempre dark (`data-theme="dark"` em `ScreenShell`).

## Convenções

- **Componentes** em `PascalCase.tsx`; **hooks** em `useXxx.ts`; **libs** em `kebab-case.ts`.
- `sections/` exportam somente componentes (regra `react-refresh/only-export-components`); constantes/variants ficam fora do arquivo ou em `data/`.
- Subcomponentes específicos de uma seção ficam em `components/<feature>/` (ex.: `components/footer/`); `components/ui/` é só para primitivos reutilizáveis.
- Classes com conflito → `cn()` (`clsx` + `tailwind-merge`).
- Estilo: Prettier sem `;`, aspas simples, trailing comma.

## Tooling

| Ferramenta      | Função                               |
| --------------- | ------------------------------------ |
| Vite            | dev server + build                   |
| TypeScript      | typecheck (`tsc -b`)                 |
| Tailwind CSS v4 | estilos utilitários + tokens         |
| ESLint          | lint (`eslint .`)                    |
| Prettier        | formatação (`format`/`format:check`) |
| GitHub Actions  | CI: lint + format:check + build      |
| Vercel          | preview por PR + deploy de `main`    |

Mais detalhes de fluxo Git em `docs/git-branches.md`.

## Tema (claro/escuro)

- O tema ativo fica em `document.documentElement.dataset.theme` (`"dark"` default ou `"light"`).
- `src/hooks/useTheme.ts` lê/persiste em `localStorage["devlevelup-theme"]`; `src/components/header/ThemeToggle.tsx` alterna.
- Os valores escuros ficam no `@theme` (default); o tema claro é uma **sobreposição de tokens** em `:root[data-theme='light']`.
- Para manter uma área escura no tema claro, marque o container com `data-theme="dark"` (ver `src/sections/Hero.tsx`).
- Texto sobre fundos de accent usa `--color-arcade-on-accent` (nunca `arcade-950` direto nesses casos).

# Arquitetura — DevLevelUp

Documento de arquitetura do repo. Resumo das regras no `AGENTS.md`.

## Visão geral

Landing page (LP) de estética 16 bits / dark arcade feita para o Hackathon SouJunior.
Campanha de apoio via [Apoia.se](https://apoia.se).

Spot: **Vite + React 19 + TypeScript + Tailwind CSS v4** (só client-side, sem SSR).

## Estrutura de `src/`

```
src/
├── App.tsx          # composição das seções
├── main.tsx         # bootstrap React
├── index.css        # tokens do Tailwind (@theme) + base
├── config.ts        # metadata do projeto (siteConfig)
├── sections/        # seções da LP (Hero, CTA, Footer)
├── components/
│   └── ui/          # primitivos reutilizáveis (Button, Card)
├── hooks/           # hooks customizados (useXxx.ts)
├── lib/             # utils (cn(), etc.)
└── data/            # dados estáticos das seções
```

### Como os arquivos se comunicam

- `main.tsx` → importa `App.tsx` (e `index.css`).
- `App.tsx` → compõe as seções de `sections/` na ordem da página.
- `sections/` → usam `components/ui/*` e dados de `data/`.
- `components/ui/*` → primitivos genéricos; usam `cn()` de `lib/utils.ts` para mesclar classes.
- Cores/fontes vêm **só** dos tokens de `index.css` (`@theme`), nunca hardcoded.

## Convenções

- **Componentes** em `PascalCase.tsx`; **hooks** em `useXxx.ts`; **libs** em `kebab-case.ts`.
- `sections/` exportam somente componentes (regra `react-refresh/only-export-components`); constantes/variants ficam fora do arquivo ou em `data/`.
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

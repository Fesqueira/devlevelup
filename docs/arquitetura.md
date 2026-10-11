# Arquitetura — DevLevelUp

Documento de arquitetura do repo. Resumo das regras no `AGENTS.md`.

## Visão geral

Landing page (LP) de estética 16 bits / dark arcade feita para o Hackathon SouJunior.
Campanha de apoio via [Apoia.se](https://apoia.se/soujunior).

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
│   ├── ui/          # primitivos reutilizáveis (Button, Card)
│   └── footer/      # subcomponentes do Footer (FooterBrand, FooterSocial)
├── hooks/           # hooks customizados (useXxx.ts)
├── lib/             # utils (cn(), etc.)
└── data/            # dados estáticos das seções
```

### Como os arquivos se comunicam

- `main.tsx` → importa `App.tsx` (e `index.css`).
- `App.tsx` → compõe as seções de `sections/` na ordem da página.
- `sections/` → usam `components/ui/*`, `components/<feature>/*` e dados de `data/`.
- `components/ui/*` → primitivos genéricos; usam `cn()` de `lib/utils.ts` para mesclar classes.
- `components/<feature>/*` → subcomponentes específicos de uma seção (ex.: `components/footer/`); usam `cn()` e tokens do `@theme`.
- Cores/fontes vêm **só** dos tokens de `index.css` (`@theme`), nunca hardcoded.

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

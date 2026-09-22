# Git — Branches, Commits, PR e Review

Padrões de fluxo Git do DevLevelUp. Regras resumidas também estão no `AGENTS.md`.

## Branches

| Branch      | Uso                                             |
| ----------- | ----------------------------------------------- |
| `main`      | Produção — deploy automático na Vercel          |
| `feature/*` | Nova funcionalidade/seção (ex.: `feature/hero`) |
| `fix/*`     | Correção (ex.: `fix/css-blur-em-mobile`)        |
| `chore/*`   | Tarefa interna/infra (ex.: `chore/ci-lint`)     |

Regras:

- Trabalhar sempre a partir de `main` atualizado.
- Nunca commitar direto em `main`.
- Para mudar algo: criar branch de `main`, commitar e abrir PR.

## Commits

Formato **Conventional Commits**:

```
feat(escopo): descrição
fix(escopo): descrição
refactor(escopo): descrição
chore(escopo): descrição
docs(escopo): descrição
```

Exemplos:

- `feat(hero): adiciona grid de requisitos`
- `fix(button): corrige contraste do hover`
- `chore(ci): adiciona workflow de lint/build`

Regras:

- Mensagem em **português**, descritiva.
- Um commit = uma mudança coesa (nada de "commit bomb" com 3 features).
- Corpo do commit (se for preciso) explica o _porquê_, não o _quê_.

## Nomenclatura de arquivos

| Item                | Padrão               | Exemplo                        |
| ------------------- | -------------------- | ------------------------------ |
| Componentes         | `PascalCase.tsx`     | `Button.tsx`, `Hero.tsx`       |
| Hooks               | `useXxx.ts`          | `useMediaQuery.ts`             |
| Utils/lib           | `kebab-case.ts`      | `lib/utils.ts`                 |
| Seções do layout    | `src/sections/`      | `src/sections/Hero.tsx`        |
| UI/primitivos       | `src/components/ui/` | `src/components/ui/Button.tsx` |
| Dados estáticos     | `src/data/`          | `src/data/nav.ts`              |
| Metadata do projeto | `src/config.ts`      | `siteConfig`                   |

## PRs e review

- PR deve ter **mínimo 1 reviewer**; o **QA** veta/libera cada PR via preview da Vercel.
- Merge em `main` é feito com **squash** (histórico limpo).
- Checklist obrigatório do PR (template em `.github/PULL_REQUEST_TEMPLATE.md`):
  - QA aprovou no preview da Vercel
  - `npm run lint` verde
  - `npm run format:check` verde
  - `npm run build` verde
- CI roda `npm ci` → `lint` → `format:check` → `build` em cada PR; só mergeia com CI verde.

## Dependências

- **Novo pacote sempre via PR revisado** — nunca instalar e commitar direto na branch isolada sem review.
- Runtime (usado em produção, ex.: `clsx`, `tailwind-merge`) → `dependencies`.
- Tooling/lint/format (ex.: `eslint`, `prettier`, `typescript`) → `devDependencies`.
- Sempre commitar `package-lock.json`.

## CI (GitHub Actions)

Workflow em `.github/workflows/ci.yml`:

```
npm ci → npm run lint → npm run format:check → npm run build
```

Executado a cada push de PR (e push em `main`). Merge em `main` dispara o auto-deploy da Vercel.

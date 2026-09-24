# Git — Branches, Commits, PR e Review

Padrões de fluxo Git do DevLevelUp, baseados no **Gitflow clássico** (Vincent Driessen). Regras resumidas também estão no `AGENTS.md`.

## Modelo de branches

| Branch            | Origem        | Destino do PR | Uso                                                              |
| ----------------- | ------------- | ------------- | ---------------------------------------------------------------- |
| `main`            | —             | —             | Produção — deploy automático na Vercel; sempre taggável (`vX.Y.Z`) |
| `develop`         | `main`        | —             | Integração — base para features e destino padrão dos PRs          |
| `feature/*`       | `develop`     | `develop`     | Nova funcionalidade/seção (ex.: `feature/hero`)                   |
| `fix/*`           | `develop`     | `develop`     | Correção (ex.: `fix/css-blur-em-mobile`)                          |
| `chore/*`         | `develop`     | `develop`     | Tarefa interna/infra (ex.: `chore/ci-lint`)                       |
| `release/vX.Y.Z`  | `develop`     | `main`        | Preparação de release; merge em `main` + volta para `develop`     |
| `hotfix/*`        | `main`        | `main`        | Correção urgente de produção; merge em `main` + volta para `develop` |

## Ciclo de vida

```
        feature/* ──┐
        fix/* ──────┤  PR (squash)
        chore/* ────┤
                    ▼
   main ◄── release/vX.Y.Z ◄── develop
     ▲          (PR --no-ff + tag)      ▲
     │                                  │
     └──────── hotfix/* ────────────────┘
          (PR --no-ff + tag, volta p/ develop)
```

### Feature / fix / chore

**Fluxo com PR** (fluxo padrão para todas as entregas):

1. A partir de `develop` atualizado, criar a branch:

   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/nome-da-feature
   ```

2. Commitar (Conventional Commits) e abrir PR para `develop`.
3. Merge em `develop` com **squash**.

> **Trabalho em dupla**: como o time mexe na página inteira junto, o fluxo recomendado é **um ramo compartilhado por vez** (um `feature/*` único), com `git pull --rebase` antes de cada push. Evita PRs paralelos tocando os mesmos arquivos e elimina conflitos entre devs.

### Release

1. A partir de `develop` atualizado, criar a branch de release:

   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b release/v1.0.0
   ```

2. Na branch de release: bump de versão no `package.json` (e `package-lock.json`), ajustes finais de QA e correções de release (commits `fix(release): …`).
3. Abrir PR de `release/vX.Y.Z` para `main`; merge com **--no-ff** e criar a tag semver:

   ```bash
   git checkout main
   git pull upstream main
   git merge --no-ff release/v1.0.0
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push upstream main --tags
   ```

4. Mesclar a release de volta em `develop` (para receber os fixes de release):

   ```bash
   git checkout develop
   git pull upstream develop
   git merge --no-ff release/v1.0.0
   git push upstream develop
   ```

5. Deletar a branch `release/vX.Y.Z` (local e remota).

### Hotfix

1. A partir de `main` atualizado, criar a branch:

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b hotfix/correcao-urgente
   ```

2. Corrigir, commitar e abrir PR de `hotfix/*` para `main`; merge com **--no-ff** e tag semver de patch (`v1.0.1`).
3. Mesclar o hotfix de volta em `develop` (mesmo procedimento da release).
4. Deletar a branch `hotfix/*`.

## Regras

- Trabalhar sempre a partir de `develop` atualizado (features/fixes/chores) ou `main` (hotfixes).
- Nunca commitar direto em `main` nem em `develop` — toda entrega passa por PR.
- `main` só recebe merges de `release/*` e `hotfix/*` (via PR, com **--no-ff**).
- `develop` recebe merges de `feature/*`, `fix/*`, `chore/*` (via PR, com **squash**) e de volta de `release/*`/`hotfix/*`.

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

## Versionamento

- Semver (`vX.Y.Z`): `major.minor.patch`.
- Cada merge de `release/*` em `main` gera uma tag (ex.: `v1.0.0`); cada `hotfix/*` gera tag de patch (ex.: `v1.0.1`).
- O bump de versão acontece na branch de release (nunca em `feature/*`).

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
- `feature/*`, `fix/*` e `chore/*` → PR para `develop` (merge com **squash**) — fluxo padrão para todas as entregas.
- `release/*` e `hotfix/*` → PR para `main` (merge com **--no-ff** + tag semver) e volta para `develop`.
- Checklist obrigatório do PR (template em `.github/PULL_REQUEST_TEMPLATE.md`):
  - QA aprovou no preview da Vercel
  - `npm run lint` verde
  - `npm run format:check` verde
  - `npm run build` verde
- CI roda `npm ci` → `lint` → `format:check` → `build` em cada PR e push em `main`, `develop`, `release/*` e `hotfix/*`; só mergeia com CI verde.

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

Executado a cada push de PR e push em `main`, `develop`, `release/*` e `hotfix/*`. Merge em `main` dispara o auto-deploy da Vercel.
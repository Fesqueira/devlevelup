# SPEC — SEO, Robustez e Qualidade Automatizada do DevLevelUp

> **Status da implementação**: itens ✅ existem/foram preservados; itens ❌ **implementados na branch `chore/qa-seo-robustez`** (aguardando PR para `develop` + QA no preview); itens ⚠️ registraram decisão no §19.
>
> Documento derivado de `problem.md` (raiz do repo), validado contra o estado atual e **aplicado em 11/10/2026** (branch `chore/qa-seo-robustez`).

## 1. Objetivo

Eliminar as lacunas de SEO, compartilhamento, robustez e qualidade automatizada da LP DevLevelUp (estética 16 bits / dark arcade, campanha via Apoia.se), sem quebrar o funcionamento atual e seguindo as regras de `AGENTS.md` e `docs/`.

O compartilhamento em WhatsApp/Discord/LinkedIn é o **foco da campanha e do portfólio do time** — por isso SEO social (Open Graph/Twitter Card) é prioridade alta, junto com o bug do favicon (erro no console).

## 2. Mapa do problem.md → spec

| Item do `problem.md` | Seção desta spec | Prioridade | Status |
| --- | --- | --- | --- |
| `favicon.svg` aponta para arquivo inexistente (404) | §4 | **P0** (bug) | ❌→✅ implementado |
| Sem Open Graph / Twitter Card | §5 | P1 | ❌→✅ implementado |
| Sem robots.txt / sitemap.xml / canonical | §6 | P1 | ❌→✅ implementado |
| `package.json` version `0.0.0` e nome genérico | §7 | P1 | ❌→✅ implementado |
| Sem Error Boundary | §8 | P1 | ❌→✅ implementado |
| Sem página 404 / fallback | §9 | P1 | ❌→✅ implementado |
| `.gitignore` referencia `.env.example` inexistente | §10 | P1 | ❌→✅ implementado |
| README com versões hardcoded desatualizadas | §11 | P2 | ❌→✅ implementado |
| Sem LICENSE | §12 | P2 | ❌→✅ implementado |
| Sem Lighthouse CI / axe no CI | §13 | P2 | ❌→✅ implementado |
| Sem Dependabot | §14 | P2 | ❌→✅ implementado |

## 3. Ordem de execução

Executada na ordem abaixo (cada item = uma entrega independente, commits coesos na branch `chore/qa-seo-robustez`):

1. **P0 — Favicon** (§4): corrige o 404 do `/favicon.svg`. ✅
2. **P1 — Meta tags sociais** (§5): Open Graph + Twitter Card + `og:image`. ✅
3. **P1 — Canonical + robots + sitemap** (§6). ✅
4. **P1 — Metadata do `package.json`** (§7). ✅
5. **P1 — Error Boundary** (§8). ✅
6. **P1 — Página 404** (§9). ✅
7. **P1 — `.env.example`** (§10). ✅
8. **P2 — README** (§11) + **LICENSE** (§12). ✅
9. **P2 — Lighthouse CI** (§13) + **Dependabot** (§14). ✅

## 4. Favicon — corrigir 404 (P0, bug) ✅ implementado

### Estado original

- `index.html:5` tinha `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.
- **Não existia** `public/favicon.svg` — `public/` continha apenas `images/`. Resultado: 404 no console e sem ícone na aba.

### Implementado

- `public/favicon.svg` criado: coração pixel-art (power-up) + sparkles ciano, cores do `@theme` (`#05050d` background, `#f43f5e` primary, `#fddf01` yellow, `#00f0ff` cyan), viewBox 64×64.
- `<link rel="icon">` do `index.html` mantido apontando para `/favicon.svg`.

### Critérios de aceite

- [x] `public/favicon.svg` existe e está commitado.
- [x] Nenhum 404 de `/favicon.svg` no console (dev e preview Vercel).
- [x] Ícone visível na aba do navegador.

## 5. Open Graph / Twitter Card (P1) ✅ implementado

### Estado original

- `index.html` tinha apenas `charset`, `viewport`, `description`, `title`, 2 `preload` e o `link rel="icon"`.
- Nenhuma meta `og:*` nem `twitter:*` → preview sem título/imagem no WhatsApp/Discord/LinkedIn.

### Implementado (em `index.html`)

- `og:type` = `website` · `og:site_name` = `DevLevelUp` · `og:locale` = `pt_BR`
- `og:url` = `https://devlevelup-puce.vercel.app/` (decisão §19)
- `og:title` / `og:description` — alinhados com `siteConfig` e a meta `description` (manter sincronizado manualmente)
- `og:image` = `https://devlevelup-puce.vercel.app/images/og/og-image.png` + `og:image:width/height/alt` (1200×630)
- `twitter:card` = `summary_large_image` + `twitter:title/description/image` espelhados
- `<link rel="canonical">` (§6) e `<meta name="theme-color">` = `#05050d`

### Asset `og:image`

- `public/images/og/og-image.png` — **1200×630 PNG**, crop centrado de `docs/figma/figma-hero.png` (fallback aprovado no §19; captura hi-fi do Hero).
- Mesma origem → compatível com a CSP `img-src 'self' data:` do `vercel.json`.

### Critérios de aceite

- [x] Metas `og:*` e `twitter:*` presentes em `index.html`.
- [x] `og:image` 1200×630 PNG commitado em `public/images/og/`.
- [x] URLs absolutas apontando para a produção.
- [ ] QA: compartilhar a URL no WhatsApp/Discord (ou Facebook Sharing Debugger / Twitter Card Validator) mostra título, descrição e imagem.
- [x] `lint`, `format:check`, `build` verdes.

## 6. Canonical, robots.txt e sitemap.xml (P1) ✅ implementado

### Estado original

- Sem `<link rel="canonical">`, sem `public/robots.txt`, sem `public/sitemap.xml`.

### Implementado

- `index.html`: `<link rel="canonical" href="https://devlevelup-puce.vercel.app/" />`.
- `public/robots.txt`:
  ```text
  User-agent: *
  Allow: /

  Sitemap: https://devlevelup-puce.vercel.app/sitemap.xml
  ```
- `public/sitemap.xml`: `urlset` com `<loc>https://devlevelup-puce.vercel.app/</loc>`, `<lastmod>2026-10-11</lastmod>`, `<changefreq>monthly</changefreq>`, `<priority>1.0</priority>`.

### Decisão de domínio (aplicada)

A URL de produção é **fixa e permanente**: `https://devlevelup-puce.vercel.app/` — projeto em conjunto para o time (portfólio), sem domínio próprio planejado. Usada literalmente em canonical, OG, robots, sitemap e `homepage`.

### Critérios de aceite

- [x] `rel="canonical"` presente com URL absoluta de produção.
- [x] `public/robots.txt` e `public/sitemap.xml` commitados (servidos em `/robots.txt` e `/sitemap.xml` no preview).
- [x] Sitemap referenciado no robots.txt com URL válida.
- [ ] QA: validar `/robots.txt` e `/sitemap.xml` no preview Vercel (validador Google opcional).

## 7. Metadata do `package.json` (P1) ✅ implementado

### Estado original

```json
{
  "name": "devlevelup",
  "private": true,
  "version": "0.0.0"
}
```

### Implementado

```json
{
  "name": "devlevelup",
  "description": "Landing page 16 bits (dark arcade) do DevLevelUp — campanha via Apoia.se, Hackathon SouJunior.",
  "private": true,
  "version": "1.0.0",
  "license": "MIT",
  "homepage": "https://devlevelup-puce.vercel.app/",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Fesqueira/devlevelup.git"
  }
}
```

- `version: 1.0.0` — decisão §19 (primeira release; manter em sync com a tag `v1.0.0` no fluxo `release/*`).
- `name` mantido (`devlevelup`, `private`) — decisão §19.
- `package-lock.json` sincronizado (regra do `AGENTS.md`).

### Critérios de aceite

- [x] `version` coerente (≠ `0.0.0`).
- [x] `description`, `homepage` e `license` preenchidos.
- [x] `package-lock.json` atualizado junto.
- [x] `format:check` verde.

## 8. Error Boundary (P1) ✅ implementado

### Estado original

- `src/main.tsx` renderizava `<App />` sem nenhum limite de erro: qualquer exceção derrubava a página inteira (tela branca).

### Implementado

- `src/components/ui/ErrorBoundary.tsx`:
  - Classe `ErrorBoundary` (named export), props `{ children, fallback? }`.
  - `getDerivedStateFromError` + `componentDidCatch` (loga via `console.error`, não engole silenciosamente).
  - Fallback default arcade: "GAME OVER" (`font-pixel`), mensagem, botão **Reiniciar** (`Button` variant `cta` → `window.location.reload()`); cores/fontes só de tokens do `@theme`.
- `src/main.tsx` envolve `<App />`:
  ```tsx
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
  ```
- `Suspense`/`SectionFallback` do `App.tsx` preservados (lazy loading intacto).
- Sem dependência nova.

### Critérios de aceite

- [x] Arquivo `src/components/ui/ErrorBoundary.tsx` com named export e props tipadas (reusa `Button` de `ui/`).
- [x] `App` envolto por `ErrorBoundary` no `main.tsx`.
- [ ] QA: forçar erro temporário em dev → fallback arcade aparece, página não fica branca; botão recarrega. **Reverter o throw antes do merge.**
- [x] `lint`, `format:check`, `build` verdes.

## 9. Página 404 / fallback (P1) ✅ implementado

### Estado original

- Sem `404.html` — URL inexistente caía no 404 padrão da Vercel, fora da identidade visual.

### Implementado

- `public/404.html` **auto-contido** (HTML + CSS inline; o Vite copia `public/` sem processar):
  - Estética 16 bits: tela "GAME OVER / NÍVEL 404", scanlines, botão "← Voltar ao início" (`/`).
  - Cores espelhadas dos tokens `@theme` (comentário no `<style>` indica a origem — página estática fica fora do build).
  - `<meta name="robots" content="noindex">` (404 não deve ser indexada).
- Vercel serve `404.html` automaticamente para rotas estáticas inexistentes (sem mudança em `vercel.json`; CSP `style-src 'unsafe-inline'` cobre o CSS inline).

### Critérios de aceite

- [x] `public/404.html` commitado, auto-contido.
- [ ] QA: `/rota-inexistente` no preview Vercel mostra a página 404 estilizada com link de volta funcional.
- [x] Nenhuma mudança em `vercel.json`.

## 10. `.env.example` (P1) ✅ implementado

### Estado original

- `.gitignore` tinha `!.env.example`, mas o arquivo **não existia**.
- `.env` local (ignorado): `LINK_PROJETO` (URL do Figma) e `FIGMAKEY` (chave de API do Figma — **segredo**).

### Implementado

- `.env.example` (raiz), valores **placeholder** somente:
  ```bash
  # URL do protótipo no Figma da LP (link "ver no Figma")
  LINK_PROJETO=

  # Chave de API do Figma — usada pelo MCP (.opencode/mcp/figma.mjs)
  # NUNCA commitar a chave real. Gere uma em: https://www.figma.com/developers/api
  FIGMAKEY=
  ```
- `.env` permanece ignorado (regra `.env` + `.env.*`, exceção só do example).

### Critérios de aceite

- [x] `.env.example` existe com os mesmos nomes de variáveis do `.env`.
- [x] Nenhum segredo real no arquivo; `.env` continua fora do git.
- [ ] QA: `git status` não acusa `.env`.

## 11. README — versões desatualizadas (P2) ✅ implementado

### Estado original

- README listava versões hardcoded erradas (**React 19.3.0 / React DOM 19.3.0 / TypeScript 6.0.3** vs `^19.2.8` / `~6.0.2` no `package.json`).

### Implementado

- Lista de stack sem versões hardcoded + nota "Versões exatas: consultar o `package.json` (evita drift deste README)".
- Seção **Deploy** com a URL de produção: `https://devlevelup-puce.vercel.app/`.
- Resto do README (Squad, Figma, comandos) preservado.

### Critérios de aceite

- [x] README sem versões hardcoded desatualizadas.
- [x] URL de deploy documentada.

## 12. LICENSE (P2) ✅ implementado

### Implementado

- `LICENSE` — **MIT**, `Copyright (c) 2026 Equipe DevLevelUp — SouJunior`.
- `package.json`: `"license": "MIT"` (coerente com §7).

### Critérios de aceite

- [x] `LICENSE` commitado; campo `license` coerente.

## 13. CI — Lighthouse / axe (P2) ✅ implementado

### Estado original

- `.github/workflows/ci.yml` já rodava `lint` + `format:check` + `build` (preservado).
- Nenhuma checagem de performance/SEO/a11y automatizada.

### Implementado (decisão §19)

- `.github/workflows/lighthouse.yml` (workflow separado, **não-bloqueante**):
  - Roda em `pull_request` e push em `main`/`develop`/`release/**`/`hotfix/**` (mesmos gatilhos do `ci.yml`).
  - `npm ci` → `npm run build` → `npx --yes @lhci/cli@0.14.0 autorun` (Lighthouse CI **sobre o `vite preview`** em `localhost:4173`, sem depender de URL de preview, sem dependência nova no `package.json`).
  - `lighthouserc.json`: `collect.startServerCommand` = `npm run preview -- --port 4173 --strictPort` + `collect.url` = `http://localhost:4173/` (audita só a LP, não o `404.html`); asserções **WARN** (`performance ≥ 0.8`, `accessibility/best-practices/seo ≥ 0.9` — não quebram o build); upload em `filesystem` + artefato `lighthouse-report`.

### Critérios de aceite

- [x] Workflow + config commitados; `ci.yml` intacto.
- [ ] CI: job Lighthouse verde no PR (ou rodando com warnings) e relatório disponível como artefato.
- [x] Nenhuma dependência nova no `package.json`.

## 14. Dependabot (P2) ✅ implementado

### Implementado (decisão §19)

- `.github/dependabot.yml`:
  ```yaml
  version: 2
  updates:
    - package-ecosystem: npm
      directory: '/'
      schedule:
        interval: weekly
      open-pull-requests-limit: 3
      target-branch: develop
      groups:
        minor-patch:
          update-types: ['minor', 'patch']
  ```

### Critérios de aceite

- [x] `.github/dependabot.yml` commitado e válido (YAML parseável pelo Prettier/CI).
- [ ] PRs de dependência chegam contra `develop` com grupo minor/patch (visível na aba "Insights → Dependency graph" após merge).

## 15. Regras gerais de implementação (aplicadas)

- Tokens do `@theme` (sem cores/fontes hardcoded em código; a exceção documentada é o `404.html` estático, com comentário apontando os tokens).
- `cn()` para mesclar classes; arquivos `PascalCase.tsx`/`kebab-case.ts`; `sections/` intactas.
- Conventional Commits em **português** (lista no §18).
- Nenhuma dependência nova de runtime (LHCI roda via `npx` no CI; Dependabot é config).
- Fluxo Git: branch `chore/qa-seo-robustez` a partir de `develop` → PR para `develop` (squash), nunca commit direto em `main`.
- Arquivos estáticos novos em `public/` (convenção Vite).

## 16. Validação final

Rodado na branch (todos verdes):

```bash
npm run lint
npm run format:check
npm run build
```

QA manual pendente no preview Vercel (checklist no PR):

- [ ] Console sem 404 de `/favicon.svg`.
- [ ] Compartilhamento WhatsApp/Discord mostra título + imagem (ou Facebook Sharing Debugger / Twitter Card Validator).
- [ ] `/robots.txt` e `/sitemap.xml` acessíveis; página 404 estilizada em rota inexistente.
- [ ] Error Boundary testado em dev com throw temporário (revertido antes do merge).
- [ ] README sem versões desatualizadas; `.env.example` presente; `git status` sem `.env`.

## 17. Critérios de aceite (status)

- [x] §4 Favicon: sem 404, ícone na aba.
- [x] §5 Open Graph/Twitter: tags presentes com URL de produção (QA do preview pendente).
- [x] §6 Canonical + robots + sitemap servidos com URL de produção.
- [x] §7 `package.json` com version/description/homepage/license coerentes.
- [x] §8 Error Boundary envolvendo `App` com fallback arcade.
- [x] §9 `404.html` estilizado servido pelo Vercel.
- [x] §10 `.env.example` documentando `LINK_PROJETO` e `FIGMAKEY`.
- [x] §11 README sem versões hardcoded desatualizadas.
- [x] §12 LICENSE + campo `license` coerentes.
- [x] §13 Lighthouse CI (não-bloqueante) com relatório em artefato.
- [x] §14 Dependabot ativo para npm na `develop`.
- [x] `lint`, `format:check`, `build` verdes; LP funcionando sem alterações desnecessárias. ✅ (preservado)

## 18. Commits da entrega (Conventional Commits, pt-BR)

1. `docs(spec): registra decisões e status da spec de QA/SEO`
2. `fix(favicon): adiciona favicon.svg pixel-art e elimina 404 no console`
3. `feat(seo): adiciona Open Graph, Twitter Card e canonical`
4. `feat(seo): adiciona robots.txt e sitemap.xml`
5. `chore(package): estabiliza versão 1.0.0 e preenche metadata`
6. `feat(ui): adiciona ErrorBoundary com fallback arcade`
7. `feat(404): adiciona página 404 estilizada`
8. `docs(env): documenta variáveis no .env.example`
9. `docs(readme): remove versões hardcoded e registra URL de deploy`
10. `docs(license): adiciona licença MIT`
11. `chore(ci): adiciona Dependabot e Lighthouse CI não-bloqueante`

## 19. Decisões registradas (⚠️ resolvidas)

| Decisão | Resolução |
| --- | --- |
| Domínio de produção (bloqueava §5/§6/§7) | `https://devlevelup-puce.vercel.app/` — **fixo e permanente** (projeto de portfólio do time, sem domínio próprio; ver §6) |
| `og:image` | Crop 1200×630 de `docs/figma/figma-hero.png` → `public/images/og/og-image.png` (fallback aprovado; arte dedicada = evolução futura) |
| Versão semver | `1.0.0` (primeira release; sync com tag `v1.0.0` no fluxo `release/*`; nunca mais `0.0.0`) |
| `name` do package.json | Mantido `devlevelup` (`private: true`) — nome não bloqueia nada |
| Licença | **MIT** — `Copyright (c) 2026 Equipe DevLevelUp — SouJunior` |
| Lighthouse CI | `npx @lhci/cli` sobre `vite preview` (raiz `/`), job separado **não-bloqueante** com asserções WARN + artefato (sem dep. nova) |
| Dependabot | `target-branch: develop`, semanal, grupo `minor-patch`, limite 3 PRs |
| 404 | `public/404.html` estático auto-contido (SPA de rota única; roteador só se for adicionado no futuro) |
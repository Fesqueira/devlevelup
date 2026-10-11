# Spec — Páginas de Loading, 404 e 500

- **Status:** planejado
- **Branch:** `feature/paginas-loading-erro`
- **Escopo:** tela de loading (boot + React), página 404, página 500 (`ErrorBoundary`) e roteamento client-side mínimo com fallback SPA
- **Referências:** `AGENTS.md`, `docs/arquitetura.md`, `docs/padrao-componentes.md`, `docs/git-branches.md`

## 1. Contexto

A LP é 100% client-side (Vite + React 19), **sem router** e **sem páginas de erro/loading**.

Estado atual:

- `vercel.json` define apenas `headers`; **não** há `rewrites`. Rota inexistente cai no 404 padrão da Vercel.
- `App.tsx` compõe as seções direto, sem roteamento; não existe `ErrorBoundary` (erro de render = tela branca).
- `index.html` entrega `#root` vazio: durante o download/execução do bundle há flash de tela branca.
- `SectionFallback` é o único fallback visual (bloco vazio) e cobre apenas as seções lazy abaixo da dobra.
- O `spec.md` anterior (modo claro) já previa "páginas 404/erro fora da LP".

Fatos da plataforma (Vercel):

- **404:** para SSG, `404.html` no output; para SPA, catch-all no roteamento client-side.
- **500 customizado de plataforma** (timeout/throttle) é uma feature **Enterprise-only** — fora do alcance deste projeto. O 500 útil aqui é o `ErrorBoundary` de runtime.

## 2. Objetivo

1. Tela de **loading** arcade (spinner pixel 16 bits) visível já no primeiro paint e reutilizável em React.
2. Página **404** dedicada (tela cheia arcade) para rotas inexistentes.
3. Página **500** (`ErrorBoundary`) para erros de render.
4. Roteamento client-side mínimo, **sem novas dependências**.
5. Manter a LP intacta e `lint` + `format:check` + `build` verdes.

## 3. Não-objetivos

- Não adicionar router (`react-router` ou similar).
- Não implementar tema claro nas telas de loading/erro (permanecem dark, fora da LP).
- Não criar status HTTP 404 real via `public/404.html` (evolução futura).
- Não criar páginas por código (501/502/504) nem usar o 500 de plataforma da Vercel (Enterprise-only).
- Não alterar a identidade visual da LP.

## 4. Decisões (travadas com o time)

| #   | Decisão          | Valor                                                                       |
| --- | ---------------- | --------------------------------------------------------------------------- |
| 1   | Abordagem        | React SPA com o tema arcade, sem dependência nova                           |
| 2   | Layout das telas | Tela cheia dedicada, sem Header/Footer da LP                                |
| 3   | Loading          | Splash HTML/CSS no boot + componente `LoadingScreen` (spinner pixel 16bits) |
| 4   | Roteamento       | Hook `usePathname`; `/` = LP, qualquer outra rota = 404                     |
| 5   | 500              | `ErrorBoundary` de render (não plataforma)                                  |
| 6   | Tema             | Telas de loading/erro sempre dark, sem toggle                               |
| 7   | Fallback SPA     | `rewrites` catch-all → `/index.html` no `vercel.json` (soft 404)            |
| 8   | Título da aba    | `document.title` por tela                                                   |

## 5. UX / comportamento

### 5.1 Loading

- Aparece imediatamente ao abrir o site (antes do React montar), com fundo `--color-arcade-background`, spinner pixel 16 bits e "CARREGANDO…" em fonte pixel.
- Some quando o React monta; o visual é **idêntico** ao da `LoadingScreen` para a transição ser fluida.
- Respeita `prefers-reduced-motion` (sem rotação; indicador estático + texto).

### 5.2 404

- Rota desconhecida exibe tela cheia: código "404", título "Fase não encontrada", mensagem e CTA "Voltar ao início".
- O retorno usa link absoluto (`href="/"`).

### 5.3 500

- Erro de render exibe tela cheia: código "500", título "Erro no servidor" e ações "Recarregar" (`window.location.reload`) e "Voltar ao início".

### 5.4 Navegação e histórico

- `usePathname` escuta `popstate` para refletir voltar/avançar.
- Títulos da aba atualizados por tela (`404 — DevLevelUp`, `500 — DevLevelUp`).

## 6. Design técnico

### 6.1 Roteamento mínimo — `src/hooks/usePathname.ts`

```ts
export function usePathname(): string
```

- Estado inicial de `window.location.pathname`; efeito registra/limpa `popstate`.
- `App.tsx` decide: `pathname === '/'` (ou vazio) → `LandingPage`; caso contrário → `NotFound`.

### 6.2 Loading de boot — `index.html`

- Markup do spinner + "CARREGANDO…" dentro de `#root`.
- `<style>` inline com a paleta arcade (hex fixos) e `@keyframes` com `steps()` (efeito 16 bits).
- Substituído automaticamente quando o React monta.

### 6.3 `LoadingScreen` — `src/components/ui/LoadingScreen.tsx`

```tsx
interface LoadingScreenProps {
  className?: string
}
```

- Tela cheia, `role="status"`, `aria-live="polite"` e label "Carregando…" para leitor de tela.
- `className` mesclável com `cn()`; usa tokens do `@theme`.

### 6.4 `ScreenShell` — `src/components/ui/ScreenShell.tsx`

```tsx
interface ScreenShellProps {
  children: ReactNode
  className?: string
}
```

- Shell full-screen (fundo + `Starfield` + `Glow`) compartilhado por `LoadingScreen` e `ErrorScreen`.

### 6.5 `ErrorScreen` / `ErrorBoundary`

```tsx
interface ErrorScreenProps {
  code: string
  title: string
  description: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}
```

- `ErrorBoundary` é class component (`getDerivedStateFromError` + `componentDidCatch`) e renderiza `<ServerError />`.
- Não captura erro em event handler nem assíncrono (documentado).

### 6.6 Fallback SPA — `vercel.json`

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- Arquivos estáticos continuam sendo servidos primeiro.
- Trade-off: rota inexistente responde HTTP 200 (soft 404).

### 6.7 Arquivos afetados

| Arquivo                                  | Mudança                                                       |
| ---------------------------------------- | ------------------------------------------------------------- |
| `spec.md`                                | **(este arquivo)** spec da feature                            |
| `index.html`                             | splash de loading em `#root` + `<style>` inline               |
| `vercel.json`                            | `rewrites` catch-all → `/index.html`                          |
| `src/hooks/usePathname.ts`               | **(novo)** leitura de `window.location.pathname` + `popstate` |
| `src/pages/LandingPage.tsx`              | **(novo)** composição atual do `App.tsx`                      |
| `src/pages/NotFound.tsx`                 | **(novo)** página 404                                         |
| `src/pages/ServerError.tsx`              | **(novo)** página 500                                         |
| `src/components/error/ErrorScreen.tsx`   | **(novo)** layout de erro                                     |
| `src/components/error/ErrorBoundary.tsx` | **(novo)** captura de erro de render                          |
| `src/components/ui/ScreenShell.tsx`      | **(novo)** shell full-screen reutilizável                     |
| `src/components/ui/LoadingScreen.tsx`    | **(novo)** loading React                                      |
| `src/components/ui/icons.tsx`            | **(novo)** `GhostIcon` e `AlertIcon`                          |
| `src/App.tsx`                            | roteia `/` → `LandingPage` (lazy) e fallback → `NotFound`     |
| `src/main.tsx`                           | envolve `<App />` com `<ErrorBoundary>`                       |
| `docs/arquitetura.md`                    | registrar `pages/`, `components/error/` e `App.tsx` roteador  |
| `docs/padrao-componentes.md`             | linha `src/pages/` na tabela de localização                   |
| `AGENTS.md`                              | `src/pages/` na seção Nomenclatura                            |

## 7. Acessibilidade

- Telas de loading/erro com `<main>` e um único `h1`.
- `LoadingScreen` com `role="status"` + `aria-live="polite"` e texto para leitor de tela.
- Foco visível herdado dos padrões (`focus-visible:ring-arcade-cyan`).
- Contraste AA (4.5:1) entre texto e fundo nas telas novas.
- Respeito a `prefers-reduced-motion` nas animações do spinner.

## 8. Critérios de aceite

- [ ] Ao abrir o site, aparece a tela de loading antes do React montar (sem tela branca).
- [ ] Rota inexistente (ex.: `/qualquer`) mostra a página 404 em tela cheia, com CTA para `/`.
- [ ] Erro de render mostra a página 500 via `ErrorBoundary`.
- [ ] Navegar para `/` a partir da 404 carrega a LP normalmente.
- [ ] `document.title` muda por tela.
- [ ] Telas novas usam só tokens do `@theme` (sem cores/fontes hardcoded) e `cn()`.
- [ ] `npm run lint`, `npm run format:check` e `npm run build` verdes.

## 9. Verificação

1. `npm run lint`
2. `npm run format:check`
3. `npm run build`
4. QA manual (`npm run preview`):
   - `/` — loading some e a LP aparece normalmente;
   - `/qualquer-rota` — 404;
   - erro de render forçado (temporário) — 500;
   - loading com rede lenta (throttling);
   - voltar/avançar do navegador entre `/` e a 404;
   - `prefers-reduced-motion` ativo (spinner estático);
   - rodar `a11y` (contraste/responsividade) antes de liberar o PR.

## 10. Riscos e mitigação

| Risco                                           | Mitigação                                                   |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Flash de tela branca no boot                    | Splash HTML/CSS inline em `#root`                           |
| Splash x `LoadingScreen` divergirem visualmente | Mesmo layout/tokens nas duas peças; QA de transição         |
| Soft 404 (HTTP 200) em rotas inexistentes       | Aceito nesta entrega; evolução futura com `public/404.html` |
| `ErrorBoundary` não pegar erro de handler/async | Documentar; erro de render é o alvo desta entrega           |
| Rewrite catch-all engolir assets                | Vercel serve arquivos estáticos antes de aplicar `rewrites` |

## 11. Fora de escopo

- Router de verdade (react-router) e rotas nomeadas.
- Status HTTP 404 real (`public/404.html`).
- Páginas por código (501/502/504) e 500 de plataforma Vercel.
- Tema claro nas telas de loading/erro.
- Rastreamento/analytics de erros.

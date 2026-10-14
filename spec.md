# Spec — Modo claro + toggle sol/lua

- **Status:** implementado
- **Branch:** `feature/modo-claro`
- **Escopo:** tema claro ("arcade diurno") para a LP + botão de alternância no header
- **Referências:** `AGENTS.md`, `docs/arquitetura.md`, `docs/padrao-componentes.md`

## 1. Contexto

A LP é 100% dirigida por tokens `--color-arcade-*` declarados no `@theme` de `src/index.css`. Quase não há cor/fonte hardcoded nos componentes, então o tema claro pode ser implementado como uma **sobreposição de tokens** sob um seletor de tema, sem reescrever as seções.

Estado atual:

- `<html>` sem atributo de tema; só existe o tema escuro.
- `src/index.css` define todos os tokens em `@theme` (default escuro) e o `@layer base` aplica `bg-arcade-background` + `text-arcade-white` no `body`.
- Header em `src/sections/Header.tsx` compõe `HeaderActions` (mascote, CTA de apoio, botão do menu mobile).

## 2. Objetivo

1. Adicionar um **modo claro** coerente com a identidade 16 bits, mantendo os neon de marca.
2. Adicionar um **botão no header** que alterna entre sol (ir para claro) e lua (ir para escuro).
3. Persistir a escolha do usuário e evitar flash de tema errado no carregamento (FOUC).
4. **Não alterar** a aparência do modo escuro atual.

## 3. Não-objetivos

- Não redesenhar o Hero (permanece escuro nos dois temas).
- Não adicionar dependências novas.
- Não criar tema por seção além do escopo do Hero.
- Não implementar tema claro em eventuais páginas 404/erro fora da LP (fora de escopo nesta entrega).

## 4. Decisões (travadas com o time)

| #   | Decisão                 | Valor                                                      |
| --- | ----------------------- | ---------------------------------------------------------- |
| 1   | Hero no modo claro      | Mantém arte + painel **escuros** (via escopo de tokens)    |
| 2   | Tema na primeira visita | Sempre **dark** (sem `prefers-color-scheme`)               |
| 3   | Persistência            | `localStorage["devlevelup-theme"]` = `"light"` \| `"dark"` |
| 4   | Paleta clara            | Definida pela equipe de frontend, mantendo neon de marca   |

## 5. UX / comportamento

1. **Botão:** ícone sol/lua no header (`HeaderActions`), visível em **desktop e mobile**, posicionado antes do botão do menu.
   - No dark, mostra **sol** (`SunIcon`) — ação: "Ativar modo claro".
   - No light, mostra **lua** (`MoonIcon`) — ação: "Ativar modo escuro".
2. **Acessibilidade do botão:**
   - `aria-label` descrevendo a ação (`"Ativar modo claro"` / `"Ativar modo escuro"`).
   - Foco visível (`focus-visible:ring`), área de toque ≥ 40×40px.
   - Ícone é decorativo (SVG com `aria-hidden`).
3. **Anti-FOUC:** script inline no `<head>` aplica o tema antes do primeiro paint.
4. **Persistência:** a escolha sobrevive a reloads. Sem escolha → dark.
5. **Transição:** mudança de tema é instantânea (sem animação de cor pesada). O ícone pode ter transição curta, respeitando `motion-reduce`.

## 6. Design técnico

### 6.1 Mecanismo de tema

- Atributo em `<html>`: `data-theme="dark" | "light"`.
- `@theme` mantém os **valores escuros** (default e registro dos utilitários).
- `:root[data-theme='light']` sobrescreve os tokens para a paleta clara.
- `:root[data-theme='light'] [data-theme='dark']` **re-aplica** os tokens escuros dentro do Hero (escopo).
- `color-scheme` ajustado (`dark` no default, `light` no tema claro) para scrollbar/controles nativos.

### 6.2 Arquivos afetados

| Arquivo                                                                          | Mudança                                                                                                           |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `index.html`                                                                     | `data-theme="dark"` no `<html>` + script inline anti-FOUC no `<head>`                                             |
| `src/index.css`                                                                  | `color-scheme` base, bloco `[data-theme='light']`, bloco do escopo dark do Hero, token `--color-arcade-on-accent` |
| `src/hooks/useTheme.ts`                                                          | **(novo)** estado `'light' \| 'dark'`, aplica no `<html>` e persiste                                              |
| `src/components/ui/icons.tsx`                                                    | **(novo)** `SunIcon` e `MoonIcon`                                                                                 |
| `src/components/header/ThemeToggle.tsx`                                          | **(novo)** botão acessível                                                                                        |
| `src/components/header/HeaderActions.tsx`                                        | inclui `<ThemeToggle />`                                                                                          |
| `src/sections/Hero.tsx`                                                          | `data-theme="dark"` no `<section>` (escopo)                                                                       |
| `src/components/cta/CtaBanner.tsx`                                               | trocar `border-white/8 bg-white/3` por tokens                                                                     |
| `src/components/powerup/*`, `src/components/header/*`, `src/components/footer/*` | trocar `text-arcade-950` sobre accent por `text-arcade-on-accent`                                                 |
| `docs/arquitetura.md`                                                            | (opcional) registrar a convenção de tema                                                                          |

### 6.3 Contrato do hook `useTheme`

```ts
type Theme = 'light' | 'dark'

interface UseThemeResult {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}
```

- Inicializa de `localStorage` (fallback `'dark'`).
- Efeito aplica `document.documentElement.dataset.theme` e grava em `localStorage`.
- Sem `useContext` (apenas o botão consome nesta entrega).

### 6.4 Script anti-FOUC (`index.html`)

```html
<script>
  ;(() => {
    try {
      const stored = localStorage.getItem('devlevelup-theme')
      if (stored === 'light') {
        document.documentElement.dataset.theme = 'light'
      }
    } catch {}
  })()
</script>
```

### 6.5 Paleta clara (proposta)

Tokens escuros permanecem no `@theme`; só os abaixo são sobrescritos em `[data-theme='light']`.

**Superfícies e texto**

| Token                              | Dark (atual) | Light (proposto)   |
| ---------------------------------- | ------------ | ------------------ |
| `--color-arcade-background`        | `#05050d`    | `#f3f5fb`          |
| `--color-arcade-950`               | `#07070d`    | `#07070d` (mantém) |
| `--color-arcade-900`               | `#10101c`    | `#ffffff`          |
| `--color-arcade-800`               | `#1a1a2c`    | `#e4e8f3`          |
| `--color-arcade-700`               | `#262640`    | `#d3d9e8`          |
| `--color-arcade-white`             | `#ffffff`    | `#0b0f1d`          |
| `--color-arcade-ghost`             | `#ececf6`    | `#1f2a44`          |
| `--color-arcade-muted`             | `#7d7da1`    | `#5b6478`          |
| `--color-arcade-text-secondary`    | `#a3a3c2`    | `#475569`          |
| `--color-arcade-comparison-bullet` | `#e2e8f0`    | `#334155`          |

**Header / navegação**

| Token                       | Dark (atual)            | Light (proposto)        |
| --------------------------- | ----------------------- | ----------------------- |
| `--color-arcade-navbar`     | `rgba(9,13,22,.8)`      | `rgba(255,255,255,.85)` |
| `--color-arcade-nav-muted`  | `#94a3b8`               | `#475569`               |
| `--color-arcade-nav-border` | `rgba(255,255,255,.08)` | `rgba(15,23,42,.10)`    |

**Painéis / overlays / cards**

| Token                                   | Dark (atual)            | Light (proposto)        |
| --------------------------------------- | ----------------------- | ----------------------- |
| `--color-arcade-panel`                  | `rgba(9,13,22,.18)`     | `rgba(255,255,255,.70)` |
| `--color-arcade-hud`                    | `rgba(10,22,40,.6)`     | `rgba(255,255,255,.65)` |
| `--color-arcade-stats-bar`              | `rgba(9,13,22,.15)`     | `rgba(255,255,255,.60)` |
| `--color-arcade-tooltip`                | `rgba(15,23,42,.85)`    | `rgba(255,255,255,.95)` |
| `--color-arcade-level-frame`            | `rgba(7,10,21,.6)`      | `rgba(255,255,255,.70)` |
| `--color-arcade-comparison-card`        | `rgba(15,23,42,.4)`     | `rgba(255,255,255,.70)` |
| `--color-arcade-comparison-card-active` | `rgba(15,23,42,.6)`     | `rgba(255,255,255,.95)` |
| `--color-arcade-impact-card`            | `#0f1123`               | `#ffffff`               |
| `--color-arcade-powerup-card`           | `rgba(255,255,255,.03)` | `rgba(15,23,42,.03)`    |
| `--color-arcade-powerup-track`          | `#1e293b`               | `#e2e8f0`               |
| `--color-arcade-card-border`            | `rgba(255,255,255,.04)` | `rgba(15,23,42,.08)`    |
| `--color-arcade-icon-border`            | `rgba(255,255,255,.15)` | `rgba(15,23,42,.15)`    |

**Footer / Squad**

| Token                           | Dark (atual)            | Light (proposto)     |
| ------------------------------- | ----------------------- | -------------------- |
| `--color-arcade-footer`         | `#090d16`               | `#eef1f8`            |
| `--color-arcade-footer-heading` | `#f8fafc`               | `#0b0f1d`            |
| `--color-arcade-footer-text`    | `#cbd5e1`               | `#475569`            |
| `--color-arcade-footer-divider` | `rgba(255,255,255,.08)` | `rgba(15,23,42,.10)` |

**Accents (escurecidos para uso como texto)**

| Token                              | Dark (atual)           | Light (proposto)                        |
| ---------------------------------- | ---------------------- | --------------------------------------- |
| `--color-arcade-cyan`              | `#00f0ff`              | `#0c6980`                               |
| `--color-arcade-secondary`         | `#22d3ee`              | `#0b6377`                               |
| `--color-arcade-neon`              | `#a3e635`              | `#3f6212`                               |
| `--color-arcade-purple-glow`       | `#8b5cf6`              | `#6d28d9`                               |
| `--color-arcade-primary`           | `#f43f5e`              | `#e11d48`                               |
| `--color-arcade-yellow`            | `#fddf01`              | `#fddf01` (mantém — uso decorativo/CTA) |
| `--color-arcade-cyan-badge`        | `rgba(0,240,255,.1)`   | `rgba(8,145,178,.10)`                   |
| `--color-arcade-cyan-badge-border` | `rgba(0,240,255,.18)`  | `rgba(8,145,178,.25)`                   |
| `--color-arcade-cyan-icon`         | `rgba(0,240,255,.08)`  | `rgba(8,145,178,.08)`                   |
| `--color-arcade-cyan-icon-border`  | `rgba(0,240,255,.15)`  | `rgba(8,145,178,.20)`                   |
| `--color-arcade-purple-badge`      | `rgba(139,92,246,.15)` | `rgba(109,40,217,.12)`                  |

**Texto sobre accent (novo token)**

| Token                      | Dark      | Light     |
| -------------------------- | --------- | --------- |
| `--color-arcade-on-accent` | `#0b0f1d` | `#ffffff` |

Usado pelos botões/chips de fundo accent (`bg-arcade-cyan`, `bg-arcade-primary`, `bg-arcade-secondary`):
`Button` (variants `primary`/`secondary`/`cyan`), `SupportLink`, `FooterSocial`, `PowerUp` (CTA), `CtaBanner` (CTA) e `ComparisonCta`.
O variant `cta` (fundo `arcade-yellow`, que permanece claro) **mantém** `text-arcade-950`.

**Contraste (validado com AA — 4.5:1):** os valores acima foram ajustados após auditoria de a11y para
cobrir texto sobre chip (`--color-arcade-cyan-badge` compositado sobre `arcade-footer`/`arcade-background`)
e o hover dos CTAs (`--color-arcade-secondary` com `--color-arcade-on-accent`).

**Glows / sombras / mascote**

- `--color-arcade-level`: `#0d1a3e` → tom claro (`#c7d2fe`) para blobs de glow.
- `--color-arcade-mascot-glow*`: reduzir alpha/escurecer para o fundo claro.
- `--color-arcade-role-*`: escurecer para uso legível (`#2563eb`, `#7c3aed`, `#0e7490`, `#c2410c`).
- `--shadow-arcade-*`: revisar intensidade no claro (glows cyan podem ficar exagerados); ajuste fino durante QA.
- `--background-image-hero-scrim` e `--color-arcade-scene-overlay`: **sem mudança** (Hero é sempre escuro).

### 6.6 Escopo escuro do Hero

```css
:root[data-theme='light'] [data-theme='dark'] {
  --color-arcade-background: #05050d;
  --color-arcade-900: #10101c;
  --color-arcade-800: #1a1a2c;
  --color-arcade-700: #262640;
  --color-arcade-white: #ffffff;
  --color-arcade-on-accent: #0b0f1d;
  --color-arcade-ghost: #ececf6;
  --color-arcade-muted: #7d7da1;
  --color-arcade-text-secondary: #a3a3c2;
  --color-arcade-hud: rgba(10, 22, 40, 0.6);
  --color-arcade-panel: rgba(9, 13, 22, 0.18);
  --color-arcade-stats-bar: rgba(9, 13, 22, 0.15);
  --color-arcade-footer-heading: #f8fafc;
  --color-arcade-footer-text: #cbd5e1;
  --color-arcade-level: #0d1a3e;
  --color-arcade-cyan: #00f0ff;
  --color-arcade-secondary: #22d3ee;
  --color-arcade-cyan-badge: rgba(0, 240, 255, 0.1);
  --color-arcade-cyan-badge-border: rgba(0, 240, 255, 0.18);
  --color-arcade-cyan-icon: rgba(0, 240, 255, 0.08);
  --color-arcade-cyan-icon-border: rgba(0, 240, 255, 0.15);
}
```

Aplicado via `data-theme="dark"` no `<section>` do Hero (`src/sections/Hero.tsx` e `HeroParallax.tsx`).

## 7. Acessibilidade

- Botão com nome acessível que descreve a ação (`aria-label` dinâmico).
- Contraste mínimo AA (4.5:1) para texto nos dois temas; atenção especial a chips neon e ao accent escurecido.
- Foco visível herdado dos padrões do projeto (`focus-visible:ring-arcade-cyan`).
- Sem dependência exclusiva de cor para transmitir o estado (ícone + label).

## 8. Critérios de aceite

- [ ] Existe botão sol/lua no header, visível em desktop e mobile, com `aria-label` correto.
- [ ] Clicar alterna entre modo claro e escuro em toda a LP (exceto Hero, que permanece escuro).
- [ ] A escolha persiste após reload (`localStorage`).
- [ ] Primeira visita (sem escolha salva) abre no escuro.
- [ ] Sem flash de tema errado no carregamento (FOUC).
- [ ] Modo escuro permanece visualmente idêntico ao atual.
- [ ] Contraste AA nos dois temas e foco visível no botão.
- [ ] `npm run lint`, `npm run format:check` e `npm run build` verdes.

## 9. Verificação

1. `npm run lint`
2. `npm run format:check`
3. `npm run build`
4. QA manual (`npm run preview`):
   - alternar tema com o botão em desktop e mobile;
   - recarregar a página e confirmar persistência;
   - limpar `localStorage` e confirmar abertura no dark;
   - checar Hero (deve continuar dark), cards, footer, chips neon e foco do teclado;
   - rodar `a11y` (contraste/responsividade) antes de liberar o PR.

## 10. Riscos e mitigação

| Risco                                                     | Mitigação                                               |
| --------------------------------------------------------- | ------------------------------------------------------- |
| Contraste de chips neon (texto accent sobre fundo claro)  | Escurecer tokens de accent no light; validar com `a11y` |
| Texto sobre accent brilhante ficar ilegível               | Token `--color-arcade-on-accent` nos fundos accent      |
| Hero perder contraste                                     | Escopo dark dedicado no Hero                            |
| FOUC ao carregar                                          | Script inline no `<head>`                               |
| Utilitários hardcoded (`white/3`, `white/8`) não fliparem | Trocar por tokens no `CtaBanner`                        |

## 11. Fora de escopo

- Novo asset de arte clara para o Hero.
- Tema claro em páginas fora da LP.
- Seletor de "seguir o sistema" (auto).
- Animação de transição de tema entre páginas.

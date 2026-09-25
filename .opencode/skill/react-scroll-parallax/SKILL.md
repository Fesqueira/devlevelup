---
name: react-scroll-parallax
description: Use quando for implementar efeitos de parallax scroll no DevLevelUp com react-scroll-parallax v3 (3.5.0). Cobre ParallaxProvider, useParallax, Parallax, ParallaxBanner/Layer, config de efeitos, easing e useParallaxController.
---

# React Scroll Parallax

O projeto usa `react-scroll-parallax` **v3.5.0** (já instalado) para efeitos de parallax em scroll — camadas de imagem, personagens e elementos que se movem em velocidades diferentes. Referência oficial: https://react-scroll-parallax.damnthat.tv/docs/intro

## Setup

O `<ParallaxProvider />` deve envolver a árvore da aplicação **uma única vez** (em `App.tsx`), fora de componentes que montam/desmontam em mudança de rota:

```tsx
import { ParallaxProvider } from 'react-scroll-parallax'

export default function App() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen overflow-x-hidden">...</div>
    </ParallaxProvider>
  )
}
```

Props do provider:

- `scrollAxis` — `'vertical'` (default) ou `'horizontal'`.
- `scrollContainer` — elemento com overflow próprio (default: `<body>`).
- `isDisabled` — desliga todos os efeitos; use para `prefers-reduced-motion` ou mobile.

## Hooks

### useParallax

Hook principal: retorna `{ ref, controller, element }`. Anexe `ref` ao elemento DOM que recebe o efeito:

```tsx
import { useParallax } from 'react-scroll-parallax'

function Personagem() {
  const { ref } = useParallax<HTMLDivElement>({ speed: -10 })
  return <div ref={ref} />
}
```

### useParallaxController

Acesso ao `ParallaxController` (contexto). Use para chamar `.update()` quando o layout muda (imagem carregou, rota mudou, conteúdo refluiu):

```tsx
const controller = useParallaxController()
// após load de imagem / mudança de layout:
controller.update()
```

## Componentes

### Parallax

Wrapper `div` que aplica a config aos filhos:

```tsx
<Parallax speed={-10}>
  <img src="/images/personagens-parallax/qa.png" alt="" />
</Parallax>
```

### ParallaxBanner + ParallaxBannerLayer

Banner em camadas com overflow oculto — ideal para fundos de seção (Hero, Squad). Duas formas equivalentes:

```tsx
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'

<ParallaxBanner className="h-[60vh]">
  <ParallaxBannerLayer image="/images/personagens-parallax/fundo.png" speed={-20} />
  <ParallaxBannerLayer speed={-10}>
    <img src="/images/personagens-parallax/qa.png" alt="QA" loading="lazy" />
  </ParallaxBannerLayer>
</ParallaxBanner>
```

Regras do banner:

- **Obrigatório dar altura** ao root (`className`, `style` ou `aspectRatio`) — sem altura o banner fica oculto.
- **Ordem das layers importa**: 1ª = base (fundo), última = topo.
- `expanded` (default `true`) expande a layer com margens negativas para as bordas nunca aparecerem.
- `image` aplica a imagem como `background-image` (cover); para `alt`/`loading`/`srcSet`, passe `<img>` próprio como `children`.
- `disabled` no banner desliga todas as layers.

## Config de efeitos (ParallaxElementConfig)

Aceita em `useParallax`, `<Parallax>` e layers do banner.

### speed

`number` — velocidade relativa ao scroll. Negativo = mais lento que o scroll; positivo = mais rápido.

### Efeitos CSS (formato `[start, end, easing?]`)

| Prop | Unidade default | Observação |
| --- | --- | --- |
| `translateX` / `translateY` | `%` (do tamanho do elemento) | aceita `px`, `vw`, `vh` |
| `rotate` / `rotateX` / `rotateY` / `rotateZ` | `deg` | aceita `rad`, `turn` |
| `scale` / `scaleX` / `scaleY` / `scaleZ` | — | números |
| `opacity` | — | números |

```tsx
useParallax({
  translateY: [-100, 100],
  scale: [0.9, 1.1],
  opacity: [0.5, 1],
})
```

Progresso do efeito: **start** quando o topo do elemento entra pela base da view; **end** quando a base do elemento sai pelo topo da view.

### easing

- Presets: `ease`, `easeIn`, `easeOut`, `easeInOut`, `easeInQuad`…`easeOutBack`, `easeInOutBack` (lista completa nos docs).
- Bezier custom: `easing: [0.2, -0.6, 1, -0.6]`.
- Por efeito (3º item do array): `translateY: [-100, 100, 'easeInOut']`.

### Outras props

- `startScroll` / `endScroll` — valores absolutos de scroll; quando ambos são passados, ignora o progresso relativo.
- `rootMargin` — exige os **4 campos**: `{ top: 0, right: 0, bottom: 100, left: 0 }`.
- `disabled` — desliga o efeito do elemento.
- `shouldAlwaysCompleteAnimation` — garante início/fim nos valores definidos mesmo se o elemento começa/termina fora da view.
- `targetElement` — elemento de referência para o progresso (independe da posição do elemento).
- Callbacks: `onEnter`, `onExit`, `onChange`, `onProgressChange`.

## Regras do projeto

- `ParallaxProvider` uma única vez, em `App.tsx`.
- Componentes com named export, `className?: string` e `cn()` (ver skill `componentes`).
- Configs de efeito/constantes fora de `sections/` (react-refresh) → `src/data/`.
- Imagens de parallax ficam em `public/images/personagens-parallax/`.
- Respeite `prefers-reduced-motion`: `isDisabled` no provider (ou `disabled` por elemento).
- Tokens de cor/fonte do `@theme`; nada hardcoded (ver skill `tailwind-ui`).
- `overflow-x-hidden` no wrapper do App evita scroll horizontal com `translateX`.

## Exemplos

```tsx
// hook em componente de personagem
const { ref } = useParallax<HTMLDivElement>({
  translateY: [-40, 40, 'easeOut'],
  scale: [0.95, 1],
})
```

```tsx
// banner em camadas com easing individual
<ParallaxBanner className="h-[60vh]">
  <ParallaxBannerLayer image="/images/personagens-parallax/fundo.png" speed={-20} />
  <ParallaxBannerLayer translateY={[-30, 30, 'easeInOut']}>
    <img src="/images/personagens-parallax/desenvolvimento.png" alt="" loading="lazy" />
  </ParallaxBannerLayer>
</ParallaxBanner>
```
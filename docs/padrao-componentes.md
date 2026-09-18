# Padrão de Componentes

Como criar e estruturar componentes no DevLevelUp.

## Localização

| Tipo                        | Pasta                | Exemplo                        |
| --------------------------- | -------------------- | ------------------------------ |
| Seção de layout da LP       | `src/sections/`      | `src/sections/Hero.tsx`        |
| Primítivo reutilizável / UI | `src/components/ui/` | `src/components/ui/Button.tsx` |
| Dados estáticos             | `src/data/`          | `src/data/nav.ts`              |

## Nomenclatura

- Arquivos: `PascalCase.tsx` (`Button.tsx`, `CTA.tsx`).
- Exportações: componente com **named export** (`export function Hero(...)`) — evita default export e mantém consistência.
- Seção = um arquivo por seção; se a seção precisar de subcomponentes/constantes, coloque em `src/data/` ou em arquivo separado — **não** exporte nada além de componentes de `sections/` (regra `react-refresh/only-export-components`).

## Regras gerais

1. **Props sempre tipadas** com interface `ComponentProps` (em português de código, idioma do projeto).
   ```tsx
   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'ghost'
   }
   ```
2. **`className` sobrescrevível**: sempre aceitar `className?: string` e mesclar com `cn()` de `src/lib/utils.ts` — nunca concatenar strings de classe.
3. **Tokens do `@theme`**: `--color-arcade-*`, `--font-sans`/`--font-display`, etc. Cores/fontes hardcoded são proibidas.
4. **Sem comentários** desnecessários; deixe o código explicar.
5. Sempre seguir Prettier (sem `;`, aspas simples); `npm run format` antes de terminar.

## Ícones SVG

- **Nunca** criar SVG inline dentro de um componente/seção.
- Todo ícone fica em `src/components/ui/icons.tsx`, com **named export** (`export function MenuIcon`), aceitando `className?: string`.
- O consumidor controla tamanho/cor via `className` (ex.: `<MenuIcon className="h-6 w-6" />`); a cor vem de `currentColor`.

## Exemplo — `Button.tsx`

```tsx
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 font-display',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-arcade-primary text-arcade-950 hover:bg-arcade-secondary',
  secondary: 'border border-arcade-secondary text-arcade-secondary',
  ghost: 'text-arcade-muted hover:text-arcade-ghost',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-2 py-1 text-[10px]',
  md: 'px-4 py-2 text-xs',
  lg: 'px-6 py-3 text-sm',
}
```

## Regra de ouro

Estilo reutilizável que repete em mais de um lugar → **suba para `components/ui/` ou para um token/constante**, não duplique.

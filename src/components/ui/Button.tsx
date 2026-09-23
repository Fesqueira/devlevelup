import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  rel?: string
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display uppercase tracking-wider transition-colors after:block after:h-0.5 focus:outline-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as unknown as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    )
  }

  return <button type="button" className={classes} {...props} />
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-arcade-primary text-arcade-950 hover:bg-arcade-secondary',
  secondary:
    'border border-arcade-secondary text-arcade-secondary hover:bg-arcade-secondary hover:text-arcade-950',
  ghost: 'text-arcade-muted hover:text-arcade-ghost',
  cta: 'bg-arcade-yellow text-arcade-950 hover:bg-arcade-yellow-shadow',
  cyan: 'bg-arcade-cyan text-arcade-950 hover:bg-arcade-secondary',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-2 py-1 text-[10px]',
  md: 'px-4 py-2 text-xs',
  lg: 'px-6 py-3 text-sm',
}

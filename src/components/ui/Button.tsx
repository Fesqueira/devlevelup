import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display uppercase tracking-wider transition-colors after:block after:h-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-background',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (props.href !== undefined) {
    const {
      href,
      target = '_blank',
      rel = 'noreferrer',
      ...anchorProps
    } = props
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        {...anchorProps}
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

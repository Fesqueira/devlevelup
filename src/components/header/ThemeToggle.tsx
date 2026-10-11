import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'
import { MoonIcon, SunIcon } from '../ui/icons'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg text-arcade-ghost transition-colors hover:text-arcade-cyan focus-visible:ring-2 focus-visible:ring-arcade-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-background focus-visible:outline-none',
        className,
      )}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  )
}

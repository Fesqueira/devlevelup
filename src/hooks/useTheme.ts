import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

interface UseThemeResult {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'devlevelup-theme'
const DEFAULT_THEME: Theme = 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'light'
      ? 'light'
      : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      return
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme }
}

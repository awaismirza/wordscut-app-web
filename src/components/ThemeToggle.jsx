import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  DARK_THEME,
  LIGHT_THEME,
  applyTheme,
  getInitialTheme,
  getNextTheme,
  getStoredTheme,
  getSystemPrefersDark,
  getThemeLabel,
  storeTheme,
} from '../lib/theme.js'

function getCurrentTheme() {
  return getInitialTheme({
    storedTheme: getStoredTheme(),
    systemPrefersDark: getSystemPrefersDark(),
  })
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme)
  const label = getThemeLabel(theme)
  const Icon = theme === DARK_THEME ? Sun : Moon

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')

    if (!media) {
      return undefined
    }

    function syncSystemTheme(event) {
      if (!getStoredTheme()) {
        setTheme(event.matches ? DARK_THEME : LIGHT_THEME)
      }
    }

    media.addEventListener('change', syncSystemTheme)

    return () => media.removeEventListener('change', syncSystemTheme)
  }, [])

  function handleToggle() {
    setTheme((currentTheme) => {
      const nextTheme = getNextTheme(currentTheme)
      storeTheme(nextTheme)
      return nextTheme
    })
  }

  return (
    <button
      aria-label={label}
      className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-ink transition hover:border-ink hover:bg-mist dark:border-white/15 dark:bg-graphite dark:text-white dark:hover:border-white/35 dark:hover:bg-white/10"
      onClick={handleToggle}
      title={label}
      type="button"
    >
      <Icon size={18} strokeWidth={2.25} />
    </button>
  )
}

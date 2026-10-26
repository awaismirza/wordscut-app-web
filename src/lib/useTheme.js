import { useEffect, useState } from 'react'
import { getInitialTheme, getStoredTheme, getSystemPrefersDark } from './theme.js'

function readTheme() {
  return (
    document.documentElement.dataset.theme ||
    getInitialTheme({ storedTheme: getStoredTheme(), systemPrefersDark: getSystemPrefersDark() })
  )
}

// Tracks the site's actual applied theme (manual toggle or system preference),
// not just prefers-color-scheme, by observing the root element ThemeToggle writes to.
export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => setTheme(readTheme()))
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

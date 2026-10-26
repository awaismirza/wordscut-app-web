export const DARK_THEME = 'dark'
export const LIGHT_THEME = 'light'
export const THEME_STORAGE_KEY = 'wordscut-theme'

const VALID_THEMES = new Set([DARK_THEME, LIGHT_THEME])

export function isValidTheme(theme) {
  return VALID_THEMES.has(theme)
}

export function getInitialTheme({ storedTheme, systemPrefersDark }) {
  if (isValidTheme(storedTheme)) {
    return storedTheme
  }

  return systemPrefersDark ? DARK_THEME : LIGHT_THEME
}

export function getNextTheme(theme) {
  return theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
}

export function getThemeLabel(theme) {
  return theme === DARK_THEME ? 'Switch to light mode' : 'Switch to dark mode'
}

export function getStoredTheme(storage = globalThis.localStorage) {
  try {
    return storage?.getItem(THEME_STORAGE_KEY) ?? null
  } catch {
    return null
  }
}

export function storeTheme(theme, storage = globalThis.localStorage) {
  if (!isValidTheme(theme)) {
    return
  }

  try {
    storage?.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Browsers can block storage in private or restricted contexts.
  }
}

export function getSystemPrefersDark(win = globalThis.window) {
  return win?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export function applyTheme(theme, root = globalThis.document?.documentElement) {
  if (!root || !isValidTheme(theme)) {
    return
  }

  root.classList.toggle(DARK_THEME, theme === DARK_THEME)
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

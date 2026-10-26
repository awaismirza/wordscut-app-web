import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  DARK_THEME,
  LIGHT_THEME,
  getInitialTheme,
  getNextTheme,
  getThemeLabel,
} from './theme.js'

test('uses the stored manual theme before the system theme', () => {
  assert.equal(getInitialTheme({ storedTheme: DARK_THEME, systemPrefersDark: false }), DARK_THEME)
  assert.equal(getInitialTheme({ storedTheme: LIGHT_THEME, systemPrefersDark: true }), LIGHT_THEME)
})

test('falls back to the system preference when no manual theme is stored', () => {
  assert.equal(getInitialTheme({ storedTheme: null, systemPrefersDark: true }), DARK_THEME)
  assert.equal(getInitialTheme({ storedTheme: null, systemPrefersDark: false }), LIGHT_THEME)
})

test('ignores invalid stored theme values', () => {
  assert.equal(getInitialTheme({ storedTheme: 'sepia', systemPrefersDark: true }), DARK_THEME)
})

test('toggles to the opposite manual theme and exposes accessible labels', () => {
  assert.equal(getNextTheme(LIGHT_THEME), DARK_THEME)
  assert.equal(getNextTheme(DARK_THEME), LIGHT_THEME)
  assert.equal(getThemeLabel(LIGHT_THEME), 'Switch to dark mode')
  assert.equal(getThemeLabel(DARK_THEME), 'Switch to light mode')
})

import { Theme } from '@/features/theme/types/theme';

const VALID_THEMES: Theme[] = ['light', 'dark', 'system'];

/**
 * Get theme from localStorage with validation
 * @param storageKey - The localStorage key to check
 * @returns Valid theme or null if not found/invalid
 */
export function getStoredTheme(storageKey: string): Theme | null {
  if (typeof window === 'undefined') return null;

  try {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    return storedTheme && VALID_THEMES.includes(storedTheme) ? storedTheme : null;
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
    return null;
  }
}

/**
 * Save theme to localStorage
 * @param storageKey - The localStorage key to use
 * @param theme - The theme to save
 */
export function saveTheme(storageKey: string, theme: Theme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

/**
 * Get system theme preference
 * @returns 'dark' or 'light' based on system preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get effective theme (resolved theme that should be applied to DOM)
 * @param storageKey - The localStorage key to check
 * @param defaultTheme - Default theme if none stored
 * @returns The effective theme ('light' or 'dark')
 */
export function getEffectiveTheme(
  storageKey: string,
  defaultTheme: Theme = 'system',
): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';

  const storedTheme = getStoredTheme(storageKey);
  const theme = storedTheme || defaultTheme;

  if (theme === 'system') {
    return getSystemTheme();
  } else {
    return theme;
  }
}

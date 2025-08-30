'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';
import { Theme } from '@/features/theme/types/theme';

export function useThemeToggle() {
  const { isDark, theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setSystemTheme = () => setTheme('system');

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return 'sun';
      case 'dark':
        return 'moon';
      case 'system':
        return 'monitor';
      default:
        return 'monitor';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'System';
    }
  };

  return {
    isDark,
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    getThemeIcon,
    getThemeLabel,
  };
}

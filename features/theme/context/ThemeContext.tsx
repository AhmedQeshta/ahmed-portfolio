'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType, ThemeProviderProps } from '../types/theme';
import { getStoredTheme, saveTheme, getSystemTheme, getEffectiveTheme } from '../utils/storage';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  // Initialize theme immediately with stored value or default
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return getStoredTheme(storageKey) || defaultTheme;
  });

  // Initialize resolved theme immediately using the utility function
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return getEffectiveTheme(storageKey, defaultTheme);
  });

  // Only run this effect once on mount to ensure consistency
  useEffect(() => {
    const storedTheme = getStoredTheme(storageKey);
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    } else if (!storedTheme) {
      // If no stored theme, save the default
      saveTheme(storageKey, defaultTheme);
    }
  }, [storageKey, defaultTheme, theme]);

  // Handle theme changes and apply to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    let effectiveTheme: 'light' | 'dark';

    if (theme === 'system') {
      effectiveTheme = getSystemTheme();
    } else {
      effectiveTheme = theme;
    }

    // Apply theme class to document
    root.classList.add(effectiveTheme);
    setResolvedTheme(effectiveTheme);
  }, [theme]);

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const newTheme = getSystemTheme();
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Custom setTheme function that always saves to localStorage
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    saveTheme(storageKey, newTheme);
  };

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const value = {
    isDark,
    theme,
    setTheme: handleSetTheme,
    resolvedTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

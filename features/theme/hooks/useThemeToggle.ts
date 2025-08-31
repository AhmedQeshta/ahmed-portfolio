'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';
import { Theme } from '@/features/theme/types/theme';
import { useEffect, useRef, useState } from 'react';
import { themeOptions } from '../utils/constant';
import { Monitor } from 'lucide-react';

export function useThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentTheme = themeOptions.find((option) => option.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;
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
    dropdownRef,
    setIsOpen,
    isOpen,
    CurrentIcon,
  };
}

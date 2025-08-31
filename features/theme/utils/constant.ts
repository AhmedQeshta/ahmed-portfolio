import { Theme } from '@/features/theme/types/theme';
import { Monitor, Moon, Sun } from 'lucide-react';

// constant

export const themeOptions = [
  { value: 'light' as Theme, label: 'Light', icon: Sun },
  { value: 'dark' as Theme, label: 'Dark', icon: Moon },
  { value: 'system' as Theme, label: 'System', icon: Monitor },
];

export const VALID_THEMES: Theme[] = ['light', 'dark', 'system'];

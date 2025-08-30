'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';
import { getStoredTheme } from '@/features/theme/utils/storage';

/**
 * Debug component to show current theme state and localStorage value
 * Remove this component in production
 */
export default function ThemeDebug() {
  const { theme, resolvedTheme } = useTheme();
  const storedTheme = typeof window !== 'undefined' ? getStoredTheme('portfolio-theme') : null;

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg font-mono z-50">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>Stored: {storedTheme || 'none'}</div>
      <div>
        System:{' '}
        {typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'}
      </div>
    </div>
  );
}

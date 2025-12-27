'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Breakline() {
  const { isDark } = useTheme();

  return (
    <div
      className={`my-6 h-1 w-full rounded-full ${
        isDark
          ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent'
          : 'bg-gradient-to-r from-transparent via-purple-400/40 to-transparent'
      }`}
      aria-hidden="true"
    />
  );
}

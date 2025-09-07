'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';

export default function BackgroundEffects() {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none" data-testid="background-effects">
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-purple-600/10' : 'bg-purple-400/20'
        }`}
        data-testid="background-orb"
      />
      <div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-blue-600/10' : 'bg-blue-400/20'
        }`}
        data-testid="background-orb"
      />
    </div>
  );
}

'use client';

import { IMarkCode } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Code({ children }: IMarkCode) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <code
      className={`px-2 py-1 rounded text-sm font-mono ${
        isDark ? 'bg-gray-800 text-purple-300' : 'bg-gray-200 text-purple-700'
      }`}>
      {children}
    </code>
  );
}

'use client';

import { IListNumber } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function NumberList({ children }: IListNumber) {
  const { isDark } = useTheme();

  return (
    <ol
      className={`list-decimal list-inside mb-4 space-y-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
      {children}
    </ol>
  );
}

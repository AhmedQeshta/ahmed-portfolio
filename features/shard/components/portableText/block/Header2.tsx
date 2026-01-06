'use client';

import { IBlockH2 } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Header2({ children }: IBlockH2) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <h2 className={`text-2xl font-bold mb-4 mt-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h2>
  );
}

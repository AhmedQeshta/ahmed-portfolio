'use client';

import { IBlockH1 } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Header1({ children }: IBlockH1) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <h1 className={`text-3xl font-bold mb-6 mt-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h1>
  );
}

'use client';

import { IBlockH3 } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Header3({ children }: IBlockH3) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <h3 className={`text-xl font-bold mb-3 mt-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h3>
  );
}

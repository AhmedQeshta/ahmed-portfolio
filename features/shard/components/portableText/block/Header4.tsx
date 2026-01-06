'use client';

import { IBlockH4 } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Header4({ children }: IBlockH4) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <h4 className={`text-lg font-bold mb-3 mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h4>
  );
}

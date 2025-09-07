'use client';

import { IBlockH6 } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Header6({ children }: IBlockH6) {
  const { isDark } = useTheme();

  return (
    <h6 className={`text-sm font-bold mb-2 mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h6>
  );
}

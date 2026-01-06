'use client';

import { IBlockH5 } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Header5({ children }: IBlockH5) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <h5 className={`text-base font-bold mb-2 mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h5>
  );
}

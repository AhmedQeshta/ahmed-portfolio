'use client';

import { IBlockNormal } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Normal({ children }: IBlockNormal) {
  const { isDark } = useTheme();

  return (
    <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {children}
    </p>
  );
}

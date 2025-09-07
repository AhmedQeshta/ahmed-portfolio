'use client';

import { IMarkStrong } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Strong({ children }: IMarkStrong) {
  const { isDark } = useTheme();

  return (
    <strong className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{children}</strong>
  );
}

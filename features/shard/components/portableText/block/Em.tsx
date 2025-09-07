'use client';

import { IMarkEm } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Em({ children }: IMarkEm) {
  const { isDark } = useTheme();

  return <em className={`italic ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>{children}</em>;
}

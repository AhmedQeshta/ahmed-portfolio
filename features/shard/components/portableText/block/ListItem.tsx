'use client';

import { IListBullet } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ListItem({ children }: IListBullet) {
  const { isDark } = useTheme();

  return (
    <li className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{children}</li>
  );
}

'use client';

import { IListBullet } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function BulletList({ children }: IListBullet) {
  const { isDark } = useTheme();

  return (
    <ul
      className={`list-disc list-inside mb-4 space-y-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
      {children}
    </ul>
  );
}

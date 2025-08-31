'use client';

import { IBlockQuote } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Blockquote({ children }: IBlockQuote) {
  const { isDark } = useTheme();

  return (
    <blockquote
      className={`border-l-4 border-purple-500 pl-6 py-4 my-6 rounded-r-lg ${
        isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'
      }`}>
      <div className={`italic ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{children}</div>
    </blockquote>
  );
}

'use client';

import { ITags } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Tags({ tags }: ITags) {
  const { isDark } = useTheme();
  if (!tags || tags.length === 0) return null;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8`}
      data-testid="tags-container">
      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-purple-600/20 text-purple-500 border-purple-600/20 rounded-full text-sm border ">
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}

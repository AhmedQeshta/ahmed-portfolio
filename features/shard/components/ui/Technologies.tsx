'use client';

import { getImageUrl } from '@/sanity/lib/image';
import { Tag } from 'lucide-react';
import Image from 'next/image';
import { ITechnologiesResponse } from '@/features/shard/types/technology';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Technologies({ technologies }: ITechnologiesResponse) {
  const { isDark } = useTheme();
  if (!technologies || technologies.length === 0) return null;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}
      data-testid="technologies-container">
      <h3
        className={`flex items-center gap-3 text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
        <Tag size={24} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
        Technologies
      </h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map(({ _id, logo, name }, index) => (
          <div
            key={_id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 border border-gray-600 hover:border-gray-500'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 hover:border-gray-400'
            }`}>
            {logo && (
              <div className="relative w-4 h-4">
                <Image
                  src={getImageUrl(logo, 16, 16, 90)}
                  alt={name}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
            )}
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

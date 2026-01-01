'use client';

import { IEmbedBlock } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { convertToEmbedUrl } from '@/features/shard/utils/embed';

export default function Embed({ value }: IEmbedBlock) {
  const { isDark } = useTheme();

  if (!value?.url) return null;

  const height = value.height || 400;
  const embedUrl = convertToEmbedUrl(value.url);

  return (
    <div
      className={`my-6 rounded-xl overflow-hidden ${isDark ? 'border border-gray-700' : 'border border-gray-300'}`}>
      {value.title && (
        <div
          className={`px-4 py-2 text-sm border-b ${
            isDark
              ? 'bg-gray-800/80 text-gray-300 border-gray-700'
              : 'bg-gray-100/80 text-gray-700 border-gray-300'
          }`}>
          <h3 className="font-medium">{value.title}</h3>
        </div>
      )}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <iframe
          src={embedUrl}
          title={value.title || 'Embedded content'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

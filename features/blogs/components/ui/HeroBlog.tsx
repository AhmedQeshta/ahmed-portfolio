'use client';

import { useState, useMemo } from 'react';
import { formatDate, formatReadingTime } from '@/features/shard/utils/date';
import { IBlogPostResponse } from '@/features/blogs/types/blog';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { getImageUrl } from '@/sanity/lib/image';

export default function HeroBlog({ blog }: IBlogPostResponse) {
  // Handle null blog
  if (!blog) {
    return null;
  }

  const { thumbnail, title, categories, publishedAt, readingTime, featured } = blog;

  const { isDark } = useTheme();
  const [imageError, setImageError] = useState(false);

  // Process thumbnail image URL
  const imageUrl = useMemo(() => {
    if (!thumbnail) return null;
    try {
      return getImageUrl(thumbnail, 1920, 1080, 90);
    } catch {
      return null;
    }
  }, [thumbnail]);

  return (
    <div className="relative h-[50vh] overflow-hidden">
      {/* Fallback background gradient */}

      {/* Image */}
      {imageUrl && !imageError ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark
              ? 'from-purple-900/80 via-blue-900/80 to-pink-900/80'
              : 'from-purple-500/60 via-blue-500/60 to-pink-500/60'
          }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`text-6xl md:text-8xl font-bold ${
                isDark ? 'text-white/30' : 'text-white/40'
              }`}>
              {title?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      )}

      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isDark
            ? 'from-black via-black/70 to-transparent'
            : 'from-white via-white/70 to-transparent'
        }`}
      />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories and Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories?.map(({ _id, name }) => (
              <div
                key={_id}
                className="px-3 py-1 bg-purple-600/80 text-white text-sm rounded-full backdrop-blur-sm">
                {name}
              </div>
            ))}
          </div>

          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
            {title}
          </h1>

          {/* Meta Info */}
          <div
            className={`flex flex-wrap items-center gap-6 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{formatReadingTime(readingTime)}</span>
            </div>
            {featured && (
              <div className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded border border-yellow-500/30">
                FEATURED
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

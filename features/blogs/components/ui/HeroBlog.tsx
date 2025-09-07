'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { formatDate, formatReadingTime } from '@/features/shard/utils/date';
import { IBlogPostResponse } from '@/features/blogs/types/blog';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function HeroBlog({ blog }: IBlogPostResponse) {
  if (!blog) return null;
  const { isDark } = useTheme();

  const { thumbnail, title, categories, publishedAt, readingTime, featured } = blog;

  return (
    <div className="relative h-[50vh] overflow-hidden">
      <Image src={thumbnail} alt={title} fill className="object-cover" priority />

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
          <ScrollAnimation direction="down" delay={0.3} className="flex flex-wrap gap-2 mb-4">
            {categories?.map(({ _id, name }) => (
              <ScrollAnimation
                key={_id}
                direction="down"
                delay={0.4}
                className="px-3 py-1 bg-purple-600/80 text-white text-sm rounded-full backdrop-blur-sm">
                {name}
              </ScrollAnimation>
            ))}
          </ScrollAnimation>

          {/* Title */}
          <ScrollAnimation
            direction="down"
            delay={0.5}
            className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
            {title}
          </ScrollAnimation>

          {/* Meta Info */}
          <ScrollAnimation
            direction="down"
            delay={0.6}
            className={`flex flex-wrap items-center gap-6 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
            <ScrollAnimation direction="down" delay={0.7} className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(publishedAt)}</span>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.8} className="flex items-center gap-2">
              <Clock size={16} />
              <span>{formatReadingTime(readingTime)}</span>
            </ScrollAnimation>
            {featured && (
              <ScrollAnimation
                direction="down"
                delay={0.9}
                className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded border border-yellow-500/30">
                FEATURED
              </ScrollAnimation>
            )}
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}

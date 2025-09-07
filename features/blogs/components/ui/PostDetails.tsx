'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { formatDate, formatReadingTime } from '@/features/shard/utils/date';
import { IBlogPostResponse } from '@/features/blogs/types/blog';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function PostDetails({ blog }: IBlogPostResponse) {
  if (!blog) return null;
  const { isDark } = useTheme();

  const { publishedAt, readingTime, categories, tags } = blog;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.2}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <ScrollAnimation direction="down" delay={0.3}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Post Details
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4}>
        <div className="space-y-3 text-sm">
          <ScrollAnimation direction="down" delay={0.5} className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Published:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {formatDate(publishedAt)}
            </span>
          </ScrollAnimation>
          <ScrollAnimation direction="down" delay={0.6} className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Reading Time:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {formatReadingTime(readingTime)}
            </span>
          </ScrollAnimation>
          {categories && (
            <ScrollAnimation direction="down" delay={0.7} className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Categories:</span>
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {categories.length}
              </span>
            </ScrollAnimation>
          )}
          {tags && (
            <ScrollAnimation direction="down" delay={0.8} className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Tags:</span>
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {tags.length}
              </span>
            </ScrollAnimation>
          )}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

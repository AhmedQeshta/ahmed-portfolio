'use client';

import { formatDate, formatReadingTime } from '@/features/shard/utils/date';
import { IBlogPostResponse } from '@/features/blogs/types/blog';
import { useTheme } from '@/features/theme/hooks/useTheme';

interface PostDetailsProps extends IBlogPostResponse {
  viewCount?: number;
}

export default function PostDetails({ blog, viewCount }: PostDetailsProps) {
  if (!blog) return null;
  const { isDark } = useTheme();

  const { publishedAt, readingTime, categories, tags } = blog;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Post Details
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Published:</span>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {formatDate(publishedAt)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Reading Time:</span>
          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {formatReadingTime(readingTime)}
          </span>
        </div>
        {categories && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Categories:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {categories.length}
            </span>
          </div>
        )}
        {tags && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Tags:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {tags.length}
            </span>
          </div>
        )}
        {viewCount !== undefined && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Views:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {viewCount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

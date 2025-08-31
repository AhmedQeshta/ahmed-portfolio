'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { getImageUrl } from '@/sanity/lib/image';
import { formatDate } from '@/features/shard/utils/date';
import { ILatestBlogs } from '@/features/blogs/types/blog';
import Image from 'next/image';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function LatestBlogs({ latestBlogs }: ILatestBlogs) {
  if (!latestBlogs || latestBlogs.length === 0) return null;
  const { isDark } = useTheme();

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
          Latest Posts
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4} className="space-y-4">
        {latestBlogs.slice(0, 3).map(({ _id, slug, thumbnail, title, publishedAt }) => (
          <OptimizedLink href={`/blogs/${slug}`} key={_id} className="block group">
            <div
              className={`flex gap-3 p-3 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/50'
              }`}>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={getImageUrl(thumbnail, 64, 64, 90)}
                  alt={title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <ScrollAnimation direction="down" delay={0.5} className="flex-1 min-w-0">
                <h4
                  className={`text-sm font-medium line-clamp-2 transition-colors ${
                    isDark
                      ? 'text-white group-hover:text-purple-300'
                      : 'text-gray-900 group-hover:text-purple-600'
                  }`}>
                  {title}
                </h4>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(publishedAt)}
                </p>
              </ScrollAnimation>
            </div>
          </OptimizedLink>
        ))}
      </ScrollAnimation>
      <ScrollAnimation
        direction="down"
        delay={0.5}
        className={`inline-block mt-4 text-sm transition-colors ${
          isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
        }`}>
        <OptimizedLink href="/blogs">View all posts →</OptimizedLink>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

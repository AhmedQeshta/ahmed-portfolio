'use client';

import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import Search from '@/features/filters/components/Search';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function BlogGridSkeleton({ readMore = true }: { readMore?: boolean }) {
  const { isDark } = useTheme();

  return (
    <section id="blogs" className={`py-10 ${!readMore && 'mt-20 lg:mt-20'}`}>
      <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5">
        <HeaderTitle
          title="Blogs"
          subtitle="Explore my latest thoughts, tutorials, and insights"
          className={`${!readMore ? 'mb-0 lg:mb-0' : 'mb-10 lg:mb-10'}`}
        />

        {!readMore && <Search action="/blogs" placeholder="Search blogs..." />}

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`h-full bg-card-bg backdrop-blur-md border ${
                isDark ? 'border-white/10' : 'border-black/10'
              } rounded-2xl overflow-hidden animate-pulse min-h-[500px]`}>
              {/* Image Skeleton */}
              <div
                className={`w-full h-56 ${
                  isDark ? 'bg-gray-700/30' : 'bg-gray-300/30'
                } rounded-xl mb-6`}
              />

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                {/* Category Skeleton */}
                <div className="flex gap-2">
                  <div
                    className={`h-6 w-20 rounded-full ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                    }`}
                  />
                  <div
                    className={`h-6 w-16 rounded-full ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                    }`}
                  />
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div
                    className={`h-6 rounded w-3/4 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                  <div
                    className={`h-6 rounded w-1/2 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div
                    className={`h-4 rounded w-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                  <div
                    className={`h-4 rounded w-5/6 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                  <div
                    className={`h-4 rounded w-4/6 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div
                    className={`h-4 w-24 rounded ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                  <div
                    className={`h-4 w-16 rounded ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

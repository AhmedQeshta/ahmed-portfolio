'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';

export default function BlogSkeleton() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDark ? 'from-gray-900 via-black to-gray-900' : 'from-gray-50 via-white to-gray-100'
      }`}>
      {/* Navigation Header */}
      <NavigationHeader link="/blogs" text="Back to Blogs" />

      {/* Hero Section Skeleton */}
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className={`w-full h-full ${isDark ? 'bg-gray-800/50' : 'bg-gray-300/50'} animate-pulse`}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Categories Skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div
                className={`h-6 w-20 rounded-full ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                } animate-pulse`}
              />
              <div
                className={`h-6 w-16 rounded-full ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                } animate-pulse`}
              />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-3 mb-4">
              <div
                className={`h-10 rounded w-3/4 ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                } animate-pulse`}
              />
              <div
                className={`h-10 rounded w-1/2 ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                } animate-pulse`}
              />
            </div>

            {/* Meta Info Skeleton */}
            <div className="flex flex-wrap gap-6">
              <div
                className={`h-5 w-32 rounded ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                } animate-pulse`}
              />
              <div
                className={`h-5 w-24 rounded ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                } animate-pulse`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Skeleton */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-8 animate-pulse`}>
                <div className="space-y-3">
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
              </div>

              {/* Content Skeleton */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-8 animate-pulse`}>
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div
                        className={`h-4 rounded w-full ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                        }`}
                      />
                      <div
                        className={`h-4 rounded w-11/12 ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                        }`}
                      />
                      <div
                        className={`h-4 rounded w-10/12 ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Share Card Skeleton */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-6 animate-pulse`}>
                <div
                  className={`h-6 rounded w-24 mb-4 ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                  }`}
                />
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-10 w-10 rounded ${
                        isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Latest Blogs Skeleton */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-6 animate-pulse`}>
                <div
                  className={`h-6 rounded w-32 mb-4 ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                  }`}
                />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`h-16 w-16 rounded ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                        }`}
                      />
                      <div className="flex-1 space-y-2">
                        <div
                          className={`h-4 rounded w-full ${
                            isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                          }`}
                        />
                        <div
                          className={`h-3 rounded w-2/3 ${
                            isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post Details Skeleton */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-6 animate-pulse`}>
                <div
                  className={`h-6 rounded w-28 mb-4 ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                  }`}
                />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex justify-between">
                      <div
                        className={`h-4 rounded w-20 ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                        }`}
                      />
                      <div
                        className={`h-4 rounded w-16 ${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

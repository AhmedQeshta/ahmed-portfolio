/**
 * Optimized loading component for critical content (like header)
 * Provides better UX with skeleton placeholder instead of generic spinner
 */
export default function PrioritizedLoading() {
  return (
    <div
      className="min-h-[400px] flex items-center justify-center py-20"
      role="status"
      aria-label="Loading critical content">
      <div className="w-full max-w-4xl px-4">
        {/* Header skeleton */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - text content skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-purple-300/20 rounded w-1/4"></div>
              <div className="h-12 bg-purple-300/30 rounded w-3/4"></div>
              <div className="h-6 bg-purple-300/20 rounded w-5/6"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-purple-300/20 rounded w-full"></div>
              <div className="h-4 bg-purple-300/20 rounded w-4/5"></div>
              <div className="h-4 bg-purple-300/20 rounded w-3/5"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-purple-300/25 rounded w-24"></div>
              <div className="h-10 bg-purple-300/25 rounded w-32"></div>
            </div>
          </div>

          {/* Right side - profile image skeleton */}
          <div className="flex justify-center">
            <div className="relative animate-pulse">
              <div className="w-64 h-64 bg-purple-300/20 rounded-full"></div>
              <div className="absolute inset-4 bg-purple-300/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Skills skeleton */}
        <div className="mt-16 animate-pulse">
          <div className="flex justify-center gap-4 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-purple-300/20 rounded-lg"
                style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Loading page content, please wait</span>
    </div>
  );
}

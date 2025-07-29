export default function Loading() {
  return (
    <div
      className="flex items-center justify-center min-h-[300px] py-20"
      role="status"
      aria-live="polite"
      aria-label="Loading content">
      <div className="flex flex-col items-center space-y-4">
        {/* Optimized loading spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-500 rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-gray-300 text-sm font-medium animate-pulse">Loading...</p>

          {/* Progress dots */}
          <div className="flex justify-center space-x-1 mt-2">
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: '0s' }}></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Content is loading, please wait</span>
    </div>
  );
}

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
          <p className="text-gray-300 mb-6">
            It looks like you've lost your internet connection. Don't worry, you can still view
            cached content.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Go to Homepage
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="block w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Try Again
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          <p>Some features may not be available while offline.</p>
        </div>
      </div>
    </div>
  );
}

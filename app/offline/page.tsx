'use client';

import Link from 'next/link';
import { WifiOff, Home, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
            <WifiOff className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            You're Offline
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            It looks like you've lost your internet connection. Don't worry, you can still view
            cached content from your previous visits.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-500">
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>

        {/* Info */}
        <div className="text-sm text-gray-500 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="flex items-center justify-center">
            <WifiOff className="w-4 h-4 mr-2 text-gray-400" />
            Some features may not be available while offline
          </p>
        </div>
      </div>
    </div>
  );
}

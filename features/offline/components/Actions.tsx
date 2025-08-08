'use client';

import { Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Actions() {
  return (
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
  );
}

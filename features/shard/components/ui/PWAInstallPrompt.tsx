'use client';

import { X, Download } from 'lucide-react';
import usePWA from '@/features/shard/hooks/usePWA';
import { useState, useEffect } from 'react';

import { BeforeInstallPromptEvent } from '@/features/shard/types/common';

export default function PWAInstallPrompt() {
  const { showPrompt, handleInstall, handleDismiss } = usePWA();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            Install Ahmed Portfolio
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            Add this app to your home screen for quick access and offline use.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="flex items-center px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors">
              <Download className="w-3 h-3 mr-1" />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-gray-600 dark:text-gray-300 text-xs font-medium hover:text-gray-800 dark:hover:text-white transition-colors">
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

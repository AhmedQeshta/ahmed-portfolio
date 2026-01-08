'use client';

import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import setupLocatorUI from '@locator/runtime';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (posthogKey && posthogHost && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        capture_pageview: false, // Disable automatic pageview capture
        // We'll handle pageviews manually via usePageView hook
      });
      setIsInitialized(true);
    }
  }, []);

  // Initialize Locator UI in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setupLocatorUI();
    }
  }, []);

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  // Only wrap with PostHogProvider if env vars are present and posthog is initialized
  if (posthogKey && posthogHost && isInitialized) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }

  // Return children without PostHogProvider if env vars are missing or not initialized
  return <>{children}</>;
}

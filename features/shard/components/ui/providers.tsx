'use client';

import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (posthogKey && posthogHost && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        capture_pageview: false, // Disable automatic pageview capture
        // We'll handle pageviews manually via usePageView hook
      });
    }
  }, []);

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  // Only wrap with PostHogProvider if env vars are present
  if (posthogKey && posthogHost) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }

  // Return children without PostHogProvider if env vars are missing
  return <>{children}</>;
}


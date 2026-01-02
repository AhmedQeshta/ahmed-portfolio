import { useEffect } from 'react';

export default function useViews(slug: string) {
  useEffect(() => {
    const sessionKey = `view-tracked-${slug}`;
    const hasTracked = sessionStorage.getItem(sessionKey);

    if (!Boolean(hasTracked)) {
      fetch(`/api/views/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          sessionStorage.setItem(sessionKey, 'true');
        })
        .catch((error) => {
          console.error('Failed to track page view:', error);
        });
    }
  }, [slug]);
}

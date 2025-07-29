'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to check if user prefers reduced motion
 * Respects accessibility preferences for animations
 */
export default function useReduceMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setShouldReduceMotion(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return shouldReduceMotion;
}

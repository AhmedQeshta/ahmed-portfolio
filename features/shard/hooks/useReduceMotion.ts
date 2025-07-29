import { useState, useEffect } from 'react';

export default function useReduceMotion() {
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

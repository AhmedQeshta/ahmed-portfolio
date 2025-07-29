'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to track if component has mounted on client-side
 * Useful for preventing hydration mismatches
 */
export default function useMount(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

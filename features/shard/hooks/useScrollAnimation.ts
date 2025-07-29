'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useInView, Variants } from 'framer-motion';

interface UseScrollAnimationProps {
  direction: 'up' | 'down' | 'left' | 'right';
  duration: number;
  delay: number;
}

export default function useScrollAnimation({
  direction,
  duration,
  delay,
}: UseScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
    amount: 0.3, // Only trigger when 30% is visible for better performance
  });

  // Memoize variants to prevent recreation on every render
  const variants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        // Remove expensive blur effect for better mobile performance
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
          // Optimize for 60fps on mobile
          type: 'tween',
        },
      },
    }),
    [direction, duration, delay],
  );

  // Properly listen for changes in motion preferences
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Handle SSR and test environments gracefully
    if (typeof window === 'undefined') return;

    let mediaQuery: MediaQueryList | null = null;

    try {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      // Set initial value
      setReduceMotion(mediaQuery.matches);

      // Create event listener function
      const handleChange = (event: MediaQueryListEvent) => {
        setReduceMotion(event.matches);
      };

      // Add event listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }

      // Cleanup function
      return () => {
        if (mediaQuery) {
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleChange);
          } else {
            // Fallback for older browsers
            mediaQuery.removeListener(handleChange);
          }
        }
      };
    } catch (error) {
      // Fallback for test environments or unsupported browsers
      setReduceMotion(false);
    }
  }, []);

  return {
    ref,
    isInView,
    variants,
    reduceMotion,
  };
}

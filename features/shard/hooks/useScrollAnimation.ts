'use client';

import { useRef, useMemo } from 'react';
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

  // Reduce animation complexity on lower-end devices
  // Handle test environment gracefully
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;

    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (error) {
      // Fallback for test environments or unsupported browsers
      return false;
    }
  }, []);

  return {
    ref,
    isInView,
    variants,
    reduceMotion,
  };
}

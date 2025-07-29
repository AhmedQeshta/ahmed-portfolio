import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useMemo } from 'react';

export interface IUseScrollAnimation {
  direction: string;
  duration: number;
  delay: number;
}

export default function useScrollAnimation({ direction, duration, delay }: IUseScrollAnimation) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Memoize variants to prevent recreation on every render
  const variants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        // Remove expensive blur effect for better mobile performance
        scale: 0.95,
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
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return { ref, isInView, variants, reduceMotion };
}

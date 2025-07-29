'use client';

import { IScrollAnimation } from '@/features/shard/types/common';
import useScrollAnimation from '@/features/shard/hooks/useScrollAnimation';
import { motion } from 'framer-motion';

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
}: IScrollAnimation) {
  const { ref, isInView, variants, reduceMotion } = useScrollAnimation({
    direction,
    duration,
    delay,
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      // Optimize rendering
      style={{ willChange: 'transform, opacity' }}>
      {children}
    </motion.div>
  );
}

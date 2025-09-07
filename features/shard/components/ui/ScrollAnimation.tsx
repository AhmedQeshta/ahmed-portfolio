'use client';

import { IScrollAnimation } from '@/features/shard/types/common';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.3,
}: IScrollAnimation) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}>
      {children}
    </motion.div>
  );
}

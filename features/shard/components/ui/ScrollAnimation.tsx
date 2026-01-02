'use client';

import React from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export default function ScrollAnimation({
  children,
  className,
  direction = 'up',
  delay = 0,
}: ScrollAnimationProps) {
  return (
    <div className={className} data-testid="scroll-animation" data-direction={direction} data-delay={delay}>
      {children}
    </div>
  );
}


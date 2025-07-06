'use client';

import { useMouseMove } from '@/hooks/useMouseMove';
import { cn } from '@/utils/statusColor';

export default function MouseMoveWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter, gradientStyle } =
    useMouseMove();
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn('relative overflow-hidden rounded-2xl', className)}>
      {/* Gradient Overlay (uses card's bg color, clipped to border radius) */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: 400,
          height: 400,
          borderRadius: '50%',
          zIndex: 1,
          transition: 'opacity 0.3s, left 0.2s, top 0.2s',
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0) 70%)',
          ...gradientStyle,
        }}
      />
      {children}
    </div>
  );
}

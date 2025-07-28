'use client';

import { useMouseMove } from '@/features/shard/hooks/useMouseMove';
import { cn } from '@/features/shard/utils/statusColor';
import { IMouseMoveWrapper } from '@/features/shard/types/common';

export default function MouseMoveWrapper({ children, className }: IMouseMoveWrapper) {
  const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter, gradientStyle } =
    useMouseMove();
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      data-testid="mouse-move-wrapper">
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
        data-testid="gradient-overlay"
      />
      {children}
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';

export function useMouseMove() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Use a color similar to your card's background, e.g., bg-card-bg (white/5 or white/10)
  // You can adjust the rgba value below to match your theme
  const gradientStyle =
    mousePos && isHovering
      ? {
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          opacity: 1,
        }
      : { opacity: 0 };

  return {
    cardRef,
    mousePos,
    isHovering,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    gradientStyle,
  };
}

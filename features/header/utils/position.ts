import { ICalculatePositionProps } from '@/features/header/types/header';

export function calculatePosition({ index, orbitTechnologies }: ICalculatePositionProps) {
  const angle = (index * (360 / orbitTechnologies.length) * Math.PI) / 180;
  const radius = 190; // Distance from center
  const delay = index * 0.5; // Animation delay

  // Calculate x and y position
  const top = 185 - Math.sin(angle) * radius;
  const left = 180 - Math.cos(angle) * radius;

  return { top, left, delay };
}

import { ICalculatePositionProps } from '@/features/header/types/header';

export function calculatePosition({
  index,
  orbitTechnologies,
  isMobile = false,
}: ICalculatePositionProps & { isMobile?: boolean }) {
  const angle = (index * (360 / orbitTechnologies.length) * Math.PI) / 180;

  // Responsive radius and center calculations
  const radius = isMobile ? 130 : 190; // Smaller radius for mobile
  const centerTop = isMobile ? 135 : 185; // Adjusted center for mobile container
  const centerLeft = isMobile ? 130 : 180; // Adjusted center for mobile container
  const delay = index * 0.5; // Animation delay

  // Calculate x and y position
  const top = centerTop - Math.sin(angle) * radius;
  const left = centerLeft - Math.cos(angle) * radius;

  return { top, left, delay };
}

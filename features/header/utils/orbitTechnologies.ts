import { IOrbitItemProps } from '@/features/header/types/header';

export function OrbitItem({ index, orbitTechnologies, windowWidth }: IOrbitItemProps) {
  // Responsive radius and center adjustments
  const isMobile = windowWidth < 640;
  const radius = isMobile ? 160 : 190; // Smaller radius for mobile
  const centerTop = isMobile ? 180 : 185; // Adjust center for mobile
  const centerLeft = isMobile ? 175 : 180; // Adjust center for mobile

  const angle = (index * (360 / orbitTechnologies.length) * Math.PI) / 180;
  const delay = index * 0.5; // Animation delay

  // Calculate x and y position
  const top = centerTop - Math.sin(angle) * radius;
  const left = centerLeft - Math.cos(angle) * radius;

  return {
    top,
    left,
    delay,
    isMobile,
  };
}

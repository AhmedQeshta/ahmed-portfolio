import { ITechnologiesOrbitProps } from '@/features/header/types/header';
import { TechnologiesOrbitItem } from '@/features/header/components/profileImage/TechnologiesOrbitItem';
import { calculatePosition } from '@/features/header/utils/position';

export default function TechnologiesOrbit({ orbitTechnologies }: ITechnologiesOrbitProps) {
  return orbitTechnologies.map((technology, index) => {
    const { top, left, delay } = calculatePosition({ index, orbitTechnologies });

    return (
      <TechnologiesOrbitItem
        technology={technology}
        top={top}
        left={left}
        delay={delay}
        key={technology._id}
      />
    );
  });
}

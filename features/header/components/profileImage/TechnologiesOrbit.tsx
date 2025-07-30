'use client';

import { ITechnologiesOrbitProps } from '@/features/header/types/header';
import { TechnologiesOrbitItem } from '@/features/header/components/profileImage/TechnologiesOrbitItem';
import { calculatePosition } from '@/features/header/utils/position';
import useMobile from '@/features/shard/hooks/useMobile';

export default function TechnologiesOrbit({ orbitTechnologies }: ITechnologiesOrbitProps) {
  const isMobile = useMobile();

  return orbitTechnologies.map((technology, index) => {
    const { top, left, delay } = calculatePosition({ index, orbitTechnologies, isMobile });

    return (
      <TechnologiesOrbitItem
        technology={technology}
        top={top}
        left={left}
        delay={delay}
        isMobile={isMobile}
        key={technology._id}
      />
    );
  });
}

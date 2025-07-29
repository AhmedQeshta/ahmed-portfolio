import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import { ITechnologyOrbitProps } from '@/features/header/types/header';
import useWindow from '@/features/shard/hooks/useWindow';
import { OrbitItem } from '@/features/header/utils/orbitTechnologies';

export default function TechnologyOrbit({ orbitTechnologies, mounted }: ITechnologyOrbitProps) {
  const windowWidth = useWindow();

  if (!mounted) return null;

  return orbitTechnologies.map((technology, index) => {
    const { top, left, delay, isMobile } = OrbitItem({ index, orbitTechnologies, windowWidth });

    return (
      <div
        key={technology._id}
        className={`absolute bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15 shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-white/15 z-20 animate-float group ${
          isMobile ? 'w-10 h-10' : 'w-12 h-12'
        }`}
        style={{
          top: `${top}px`,
          left: `${left}px`,
          animationDelay: `${delay}s`,
        }}>
        <Image
          src={getImageUrl(technology.logo, isMobile ? 24 : 30, isMobile ? 24 : 30, 90)}
          alt={technology.name}
          width={isMobile ? 24 : 30}
          height={isMobile ? 24 : 30}
          className="object-contain filter group-hover:brightness-125 transition-all duration-300"
        />

        {/* Technology Tooltip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
          <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-xl border border-white/10">
            {technology.name}
          </div>
        </div>
      </div>
    );
  });
}

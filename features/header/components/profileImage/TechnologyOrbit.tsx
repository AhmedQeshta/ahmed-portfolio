import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import { ITechnologyOrbitProps } from '@/features/header/types/header';

export default function TechnologyOrbit({ orbitTechnologies, mounted }: ITechnologyOrbitProps) {
  if (!mounted) return null;

  return orbitTechnologies.map((technology, index) => {
    const angle = (index * (360 / orbitTechnologies.length) * Math.PI) / 180;
    const radius = 190; // Distance from center
    const delay = index * 0.5; // Animation delay

    // Calculate x and y position
    const top = 185 - Math.sin(angle) * radius;
    const left = 180 - Math.cos(angle) * radius;

    return (
      <div
        key={technology._id}
        className="absolute w-12 h-12 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15 shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-white/15 z-20 animate-float group"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          animationDelay: `${delay}s`,
        }}>
        <Image
          src={getImageUrl(technology.logo, 30, 30, 90)}
          alt={technology.name}
          width={30}
          height={30}
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

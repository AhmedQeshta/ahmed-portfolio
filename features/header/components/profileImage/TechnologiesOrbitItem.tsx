import { getImageUrl } from '@/sanity/lib/image';
import { ITechnologiesOrbitItemProps } from '@/features/header/types/header';
import Image from 'next/image';

export function TechnologiesOrbitItem({
  technology: { logo, name },
  top,
  left,
  delay,
  isMobile = false,
}: ITechnologiesOrbitItemProps) {
  const itemSize = isMobile ? 'w-8 h-8' : 'w-12 h-12';
  const imageSize = isMobile ? 20 : 30;

  return (
    <div
      className={`absolute ${itemSize} bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15 shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-white/15 z-20 animate-float group`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        animationDelay: `${delay}s`,
      }}>
      <Image
        src={getImageUrl(logo, imageSize, imageSize, 90)}
        alt={name}
        width={imageSize}
        height={imageSize}
        className="object-contain filter group-hover:brightness-125 transition-all duration-300"
      />

      {/* Technology Tooltip */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
        <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-xl border border-white/10">
          {name}
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import Tooltip from '@/features/header/components/skillsIcons/Tooltip';
import { IRemainingTechnologyProps } from '@/features/header/types/header';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function RemainingTechnology({ logo, name, index }: IRemainingTechnologyProps) {
  const { isDark } = useTheme();

  return (
    <div className="group relative" style={{ animationDelay: `${index * 80}ms` }}>
      <div
        className={`relative w-10 h-10 sm:w-12 sm:h-12 ${isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30' : 'bg-purple-600/5 hover:bg-purple-600/10 border border-purple-600/10 hover:border-purple-600/30'}  rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl backdrop-blur-sm`}>
        <Image
          src={getImageUrl(logo, 24, 24, 90)}
          alt={name}
          fill
          className="object-contain filter group-hover:brightness-110 transition-all duration-300"
        />
      </div>

      {/* Enhanced Tooltip */}
      <Tooltip name={name} />
    </div>
  );
}

'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IWorkResponse } from '@/features/works/types/work';
import { MapPin } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Location({ work: { locationType, location } }: IWorkResponse) {
  if (!location) return null;
  const { isDark } = useTheme();

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <ScrollAnimation direction="down" delay={0.2}>
        <h3
          className={`flex items-center gap-3 text-xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
          <MapPin size={24} className="text-green-400" />
          Location
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
          <p className="font-medium">{location}</p>
          {locationType && (
            <p className={`text-sm capitalize mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {locationType.replace('-', ' ')}
            </p>
          )}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

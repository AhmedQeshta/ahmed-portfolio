'use client';

import { getImageUrl } from '@/sanity/lib/image';
import { Link } from 'lucide-react';
import Image from 'next/image';
import { ITechnologies } from '@/features/shard/types/technology';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function TechnologiesHome({ technologies, link }: ITechnologies) {
  if (!technologies || technologies.length === 0) return null;
  const { isDark } = useTheme();

  return (
    <div className="mb-4">
      <p className="text-text-accent text-xs mb-2 font-medium">Technologies:</p>
      <div className="flex flex-wrap gap-1.5">
        {technologies.slice(0, 4).map(({ _id, logo, name }) => (
          <div
            key={_id}
            className={`flex items-center gap-1 ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/5' : 'bg-black/5 hover:bg-black/10 border-black/5'} px-2 py-1 rounded-md transition-colors border `}>
            {logo && (
              <div className="relative w-3 h-3">
                <Image
                  src={getImageUrl(logo, 12, 12, 90)}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{name}</span>
          </div>
        ))}
        {technologies.length > 4 && (
          <Link
            href={link}
            className={`text-xs ${isDark ? 'text-gray-400 bg-white/5 border-white/5' : 'text-gray-700 bg-black/5 border-black/5'} px-2 py-1  rounded-md border `}>
            +{technologies.length - 4}
          </Link>
        )}
      </div>
    </div>
  );
}

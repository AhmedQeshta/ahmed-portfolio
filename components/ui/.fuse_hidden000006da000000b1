import { getImageUrl } from '@/sanity/lib/image';
import { TechnologyResponse } from '@/sanity/lib/types';
import { Briefcase, Tag } from 'lucide-react';
import Image from 'next/image';

interface TechnologiesProps {
  technologies: TechnologyResponse[];
}

export default function Technologies({ technologies }: TechnologiesProps) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
        <Tag size={24} className="text-purple-400" />
        Technologies
      </h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map(({ _id, logo, name }) => (
          <div
            key={_id}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition-colors">
            {logo && (
              <div className="relative w-4 h-4">
                <Image
                  src={getImageUrl(logo, 16, 16, 90)}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

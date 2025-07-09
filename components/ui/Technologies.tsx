import { getImageUrl } from '@/sanity/lib/image';
import { TechnologyResponse } from '@/sanity/lib/types';
import { Briefcase, Tag } from 'lucide-react';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface ITechnologies {
  technologies: TechnologyResponse[];
}

export default function Technologies({ technologies }: ITechnologies) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.2}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
      data-testid="technologies-container">
      <ScrollAnimation direction="down" delay={0.3}>
        <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
          <Tag size={24} className="text-purple-400" />
          Technologies
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4}>
        <div className="flex flex-wrap gap-2">
          {technologies.map(({ _id, logo, name }, index) => (
            <ScrollAnimation
              key={_id}
              direction="down"
              delay={0.4 + index * 0.1}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition-colors">
              {logo && (
                <div className="relative w-4 h-4">
                  <Image
                    src={getImageUrl(logo, 16, 16, 90)}
                    alt={name}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              )}
              {name}
            </ScrollAnimation>
          ))}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

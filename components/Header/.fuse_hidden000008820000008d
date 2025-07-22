import { getImageUrl } from '@/sanity/lib/image';
import { TechnologyResponse } from '@/sanity/lib/types';
import Image from 'next/image';

interface SkillsIconsHeaderProps {
  technologies: TechnologyResponse[];
}

export default function SkillsIconsHeader({ technologies }: SkillsIconsHeaderProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {technologies.map((technology) => (
        <div
          key={technology._id}
          className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center">
          <Image
            src={getImageUrl(technology.logo, 24, 24, 90)}
            alt={technology.name}
            width={24}
            height={24}
          />
        </div>
      ))}
    </div>
  );
}

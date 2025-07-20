import { getImageUrl } from '@/sanity/lib/image';
import { ITechnologiesResponse } from '@/utils/types/technology';
import Image from 'next/image';

export default function SkillsIconsHeader({ technologies }: ITechnologiesResponse) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-text-accent font-medium mb-3">Additional Skills</h3>
      <div className="flex flex-wrap gap-3">
        {technologies.map((technology) => (
          <div
            key={technology._id}
            className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center transition-transform hover:scale-110 border border-white/5 shadow-sm">
            <Image
              src={getImageUrl(technology.logo, 24, 24, 90)}
              alt={technology.name}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

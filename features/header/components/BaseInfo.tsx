import SkillsIconsHeader from '@/features/header/components/SkillsIconsHeader';
import { PortableText } from '@portabletext/react';
import { IBaseInfoResponse } from '@/features/header/types/header';

export default function BaseInfo({ baseInfo }: IBaseInfoResponse) {
  const { name, bio, technologies } = baseInfo;

  // Get the remaining technologies (after the first 10)
  const remainingTechnologies = technologies?.slice(10) || [];

  return (
    <div className="w-full lg:w-1/2">
      <h1 className="text-4xl lg:text-6xl font-bold gradient-text">{name}</h1>
      <div className="text-text-secondary mt-4 text-lg leading-relaxed">
        <PortableText value={bio} />
      </div>

      {/* Skills Icons - showing only the remaining technologies */}
      <div>
        <SkillsIconsHeader technologies={remainingTechnologies} />
      </div>
    </div>
  );
}

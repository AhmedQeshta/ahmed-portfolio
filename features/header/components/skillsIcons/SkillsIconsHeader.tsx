import { ITechnologiesResponse } from '@/features/shard/types/technology';
import SkillsTitle from '@/features/header/components/skillsIcons/SkillsTitle';

import RemainingTechnology from './RemainingTechnology';

export default function SkillsIconsHeader({ technologies }: ITechnologiesResponse) {
  if (!technologies || technologies.length === 0) {
    return null;
  }
  // Take remaining technologies starting after the first 8 (used in ProfileImage orbit)
  const remainingTechnologies = technologies?.slice(8) || [];

  return (
    <div className="mt-10">
      <SkillsTitle />

      <div className="flex flex-wrap gap-3 w-full">
        {remainingTechnologies.map(({ _id, logo, name }, index) => (
          <RemainingTechnology index={index} key={_id} logo={logo} name={name} />
        ))}
      </div>
    </div>
  );
}

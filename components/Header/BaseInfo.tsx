import { BaseInfoResponse } from '@/sanity/lib/types';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import SkillsIconsHeader from '@/components/Header/SkillsIconsHeader';
import { PortableText } from '@portabletext/react';

interface IBaseInfo {
  baseInfo: BaseInfoResponse;
}

export default function BaseInfo({ baseInfo }: IBaseInfo) {
  const { name, bio, technologies } = baseInfo;
  return (
    <div className="w-full lg:w-1/2">
      <h1 className="text-4xl lg:text-6xl font-bold gradient-text">{name}</h1>
      <div className="text-text-secondary mt-4 text-lg leading-relaxed">
        <PortableText value={bio} />
      </div>

      {/* Skills Icons */}
      <Suspense fallback={<Loading />}>
        <div>
          <SkillsIconsHeader technologies={technologies} />
        </div>
      </Suspense>
    </div>
  );
}

'use client';

import MouseMoveWrapper from '@/features/shard/components/ui/MouseMoveWrapper';
import { IBaseInfoResponse } from '@/features/header/types/header';
import BackgroundEffects from '@/features/header/components/profileImage/BackgroundEffects';
import TechnologyOrbit from '@/features/header/components/profileImage/TechnologyOrbit';
import ProfilePicture from '@/features/header/components/profileImage/ProfilePicture';
import useMount from '@/features/header/hooks/useMount';

export default function ProfileImage({ baseInfo }: IBaseInfoResponse) {
  const { profilePicture, name, technologies } = baseInfo;
  const mounted = useMount();

  // Get the first 8 technologies for the orbit
  const orbitTechnologies = technologies?.slice(0, 8) || [];

  return (
    <div className="w-full flex justify-start lg:justify-end">
      <div className="relative">
        {/* Enhanced Background Effects */}
        <BackgroundEffects mounted={mounted} />

        <MouseMoveWrapper className="relative overflow-visible h-[400px] w-[400px] flex items-center justify-center">
          {/* Technology Orbit - First 8 technologies */}
          <TechnologyOrbit orbitTechnologies={orbitTechnologies} mounted={mounted} />

          {/* Main Profile Image */}
          <ProfilePicture profilePicture={profilePicture} name={name} />
        </MouseMoveWrapper>
      </div>
    </div>
  );
}

'use client';

import MouseMoveWrapper from '@/features/shard/components/ui/MouseMoveWrapper';
import { IBaseInfoResponse } from '@/features/header/types/header';
import BackgroundEffect from '@/features/header/components/profileImage/BackgroundEffect';
import TechnologiesOrbit from '@/features/header/components/profileImage/TechnologiesOrbit';
import ProfilePicture from '@/features/header/components/profileImage/ProfilePicture';
import useMounted from '@/features/header/hooks/useMounted';

export default function ProfileImage({ baseInfo }: IBaseInfoResponse) {
  const { profilePicture, name, technologies } = baseInfo;
  const mounted = useMounted();
  // Get the first 8 technologies for the orbit
  const orbitTechnologies = technologies?.slice(0, 8) || [];

  return (
    <div className="w-full flex justify-start lg:justify-end">
      <div className="relative">
        {/* Enhanced Background Effects */}
        <BackgroundEffect mounted={mounted} />

        <div className="relative overflow-visible h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] flex items-center justify-center">
          {/* Technology Orbit - First 8 technologies */}
          <TechnologiesOrbit orbitTechnologies={orbitTechnologies} />

          {/* Main Profile Image */}
          <ProfilePicture profilePicture={profilePicture} name={name} />
        </div>
      </div>
    </div>
  );
}

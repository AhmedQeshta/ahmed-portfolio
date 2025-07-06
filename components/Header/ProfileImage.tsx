import { getImageUrl } from '@/sanity/lib/image';
import { BaseInfoResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import MouseMoveWrapper from '../ui/MouseMoveWrapper';

interface ProfileImageProps {
  baseInfo: BaseInfoResponse;
}

export default function ProfileImage({ baseInfo }: ProfileImageProps) {
  const { profilePicture, name } = baseInfo;
  return (
    <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
      <MouseMoveWrapper className="relative overflow-ellipsis rounded-full">
        {profilePicture ? (
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/50 animate-pulse" />
            <div
              className="absolute inset-0 rounded-full border-4 border-pink-500/50 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-sm" />
            <Image
              src={getImageUrl(profilePicture, 300, 300, 100)}
              width={300}
              height={300}
              className="rounded-full border-4 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.2),0_0_30px_rgba(139,92,246,0.1)] relative z-10 bg-white/5 backdrop-blur-[2px]"
              alt={`${name} profile picture`}
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0 rounded-full border-4 border-white/20 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
            {name.charAt(0)}
          </div>
        )}
      </MouseMoveWrapper>
    </div>
  );
}

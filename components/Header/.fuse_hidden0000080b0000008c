import { getImageUrl } from '@/sanity/lib/image';
import { BaseInfoResponse } from '@/sanity/lib/types';
import Image from 'next/image';

interface ProfileImageProps {
  baseInfo: BaseInfoResponse;
}

export default function ProfileImage({ baseInfo }: ProfileImageProps) {
  const { profilePicture, name } = baseInfo;
  return (
    <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
      <div className="relative">
        {profilePicture ? (
          <Image
            src={getImageUrl(profilePicture, 300, 300, 100)}
            width={300}
            height={300}
            className="rounded-full border-4 border-white/20 shadow-lg"
            alt={`${name} profile picture`}
            priority
          />
        ) : (
          <div className="absolute inset-0 rounded-full border-4 border-white/20 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
            {name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
}

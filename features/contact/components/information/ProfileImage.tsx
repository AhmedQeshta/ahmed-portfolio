import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import { IBaseInfo } from '@/features/contact/types/contact';

export default function ProfileImage({ baseInfo }: IBaseInfo) {
  const { profilePicture, name } = baseInfo;

  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 relative rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl mx-auto group">
      {profilePicture ? (
        <Image
          src={getImageUrl(profilePicture, 200, 200)}
          alt={name || 'Profile'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <Image
          src="/images/apple-icon-180x180.png"
          alt="Profile"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

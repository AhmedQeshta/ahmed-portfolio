import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import { IProfilePictureProps } from '@/features/header/types/header';

export default function ProfilePicture({ profilePicture, name }: IProfilePictureProps) {
  return profilePicture ? (
    <div className="relative h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] z-10">
      {/* Multiple Animated Borders */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 blur-lg animate-pulse" />
      <div className="absolute -inset-1 rounded-full border border-purple-500/40 animate-spin-slow" />
      <div
        className="absolute inset-0 rounded-full border border-blue-500/40 animate-spin-slow"
        style={{ animationDirection: 'reverse' }}
      />
      <div className="absolute inset-1 rounded-full border border-pink-500/40 animate-spin-slow" />

      {/* Inner Glow */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-pink-500/15 blur-md" />

      <Image
        src={getImageUrl(profilePicture, 300, 300, 100)}
        width={300}
        height={300}
        className="rounded-full border-2 border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.4),0_0_80px_rgba(139,92,246,0.25)] relative z-10 bg-white/5 backdrop-blur-sm object-cover w-full h-full"
        alt={`${name} profile picture`}
        priority
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/15 via-transparent to-transparent z-20 pointer-events-none" />
    </div>
  ) : (
    <div className="relative h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] md:h-[320px] md:w-[320px] z-10">
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 blur-lg animate-pulse" />
      <div className="w-full h-full rounded-full border-2 border-white/25 shadow-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl font-bold relative z-10">
        {name.charAt(0)}
      </div>
    </div>
  );
}

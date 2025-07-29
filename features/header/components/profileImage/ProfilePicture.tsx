import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import { IProfilePictureProps } from '@/features/header/types/header';

export default function ProfilePicture({ profilePicture, name }: IProfilePictureProps) {
  return profilePicture ? (
    <div className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px] z-10">
      {/* Simplified border effects for better mobile performance */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-md animate-pulse" />
      <div
        className="absolute -inset-1 rounded-full border border-purple-500/30"
        style={{
          animation: 'spin 20s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* Reduced number of animated borders for better performance */}
      <div
        className="absolute inset-0 rounded-full border border-blue-500/25"
        style={{
          animation: 'spin 25s linear infinite reverse',
          animationDelay: '0.5s',
          willChange: 'transform',
        }}
      />

      {/* Inner glow - simplified */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10" />

      <Image
        src={getImageUrl(profilePicture, 300, 300, 90)}
        width={300}
        height={300}
        className="rounded-full border-2 border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.4),0_0_80px_rgba(139,92,246,0.25)] relative z-10 bg-white/5 backdrop-blur-sm object-cover w-full h-full"
        alt={`${name} profile picture`}
        priority
        sizes="(max-width: 768px) 250px, 300px"
        quality={90}
        // Add performance optimizations
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />

      {/* Overlay gradient - simplified */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 via-transparent to-transparent z-20 pointer-events-none" />
    </div>
  ) : (
    <div className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px] z-10">
      {/* Same border effects for consistency */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-md animate-pulse" />
      <div
        className="absolute -inset-1 rounded-full border border-purple-500/30"
        style={{
          animation: 'spin 20s linear infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0 rounded-full border border-blue-500/25"
        style={{
          animation: 'spin 25s linear infinite reverse',
          animationDelay: '0.5s',
          willChange: 'transform',
        }}
      />

      {/* Fallback initial display */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 flex items-center justify-center">
        <span className="text-6xl md:text-7xl font-bold text-white">
          {name?.charAt(0)?.toUpperCase() || 'A'}
        </span>
      </div>
    </div>
  );
}

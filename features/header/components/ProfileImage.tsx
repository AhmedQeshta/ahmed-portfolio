'use client';

import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import MouseMoveWrapper from '../../shard/components/ui/MouseMoveWrapper';
import { IBaseInfoResponse } from '@/features/header/types/header';
import { useEffect, useState } from 'react';

export default function ProfileImage({ baseInfo }: IBaseInfoResponse) {
  const { profilePicture, name, technologies } = baseInfo;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the first 10 technologies for the orbit
  const orbitTechnologies = technologies?.slice(0, 10) || [];

  return (
    <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
      <div className="relative">
        {/* Light particles in background */}
        {mounted && (
          <>
            <div
              className="absolute w-6 h-6 bg-purple-500/20 rounded-full blur-md -top-10 left-20 animate-float"
              style={{ animationDelay: '1.1s' }}></div>
            <div
              className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-md top-60 -left-10 animate-float"
              style={{ animationDelay: '0.5s' }}></div>
            <div
              className="absolute w-5 h-5 bg-pink-500/20 rounded-full blur-md top-20 -right-10 animate-float"
              style={{ animationDelay: '1.7s' }}></div>
          </>
        )}

        <MouseMoveWrapper className="relative overflow-visible rounded-full h-[360px] w-[360px]">
          {/* Animated tech icons around the profile image */}
          {mounted &&
            orbitTechnologies.map((technology, index) => {
              // Calculate position around the circle
              const angle = (index * (360 / orbitTechnologies.length) * Math.PI) / 180;
              const radius = 220; // Distance from center
              const delay = index * 0.5; // Staggered animation delay

              // Calculate x and y position
              const top = 180 - Math.sin(angle) * radius;
              const left = 180 - Math.cos(angle) * radius;

              return (
                <div
                  key={technology._id}
                  className="absolute w-12 h-12 bg-card-bg backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-lg transform transition-all duration-500 hover:scale-110 z-20 animate-float"
                  style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    animationDelay: `${delay}s`,
                  }}>
                  <Image
                    src={getImageUrl(technology.logo, 28, 28, 90)}
                    alt={technology.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              );
            })}

          {profilePicture ? (
            <div className="relative h-[320px] w-[320px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Outer glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl animate-pulse" />

              {/* Animated borders */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-pulse" />
              <div
                className="absolute inset-0 rounded-full border-4 border-pink-500/30 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-pulse"
                style={{ animationDelay: '1s' }}
              />

              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-sm" />
              <Image
                src={getImageUrl(profilePicture, 320, 320, 100)}
                width={320}
                height={320}
                className="rounded-full border-4 border-white/20 shadow-[0_0_25px_rgba(0,0,0,0.3),0_0_40px_rgba(139,92,246,0.2)] relative z-10 bg-white/5 backdrop-blur-[2px] object-cover"
                alt={`${name} profile picture`}
                priority
              />
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border-4 border-white/20 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </MouseMoveWrapper>
      </div>
    </div>
  );
}

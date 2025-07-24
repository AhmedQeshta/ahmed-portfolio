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

  // Get the first 8 technologies for the orbit
  const orbitTechnologies = technologies?.slice(0, 8) || [];

  return (
    <div className="w-full flex justify-start lg:justify-end">
      <div className="relative">
        {/* Enhanced Background Effects */}
        {mounted && (
          <>
            {/* Animated Glow Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/15 via-blue-600/15 to-pink-600/15 blur-2xl animate-pulse" />
            <div
              className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600/10 via-pink-600/10 to-purple-600/10 blur-xl animate-pulse"
              style={{ animationDelay: '1s' }}
            />

            {/* Floating Particles around image */}
            <div
              className="absolute w-2 h-2 bg-purple-400/60 rounded-full blur-sm -top-6 left-14 animate-float"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full blur-sm top-16 -left-6 animate-float"
              style={{ animationDelay: '2s' }}
            />
            <div
              className="absolute w-3 h-3 bg-pink-400/60 rounded-full blur-sm top-28 -right-4 animate-float"
              style={{ animationDelay: '4s' }}
            />
            <div
              className="absolute w-1 h-1 bg-purple-400/60 rounded-full blur-sm bottom-16 -left-3 animate-float"
              style={{ animationDelay: '6s' }}
            />
            <div
              className="absolute w-2 h-2 bg-blue-400/60 rounded-full blur-sm -bottom-4 left-16 animate-float"
              style={{ animationDelay: '8s' }}
            />
            <div
              className="absolute w-1 h-1 bg-pink-400/60 rounded-full blur-sm bottom-28 -right-6 animate-float"
              style={{ animationDelay: '10s' }}
            />
          </>
        )}

        <MouseMoveWrapper className="relative overflow-visible h-[400px] w-[400px] flex items-center justify-center">
          {/* Technology Orbit - First 8 technologies */}
          {mounted &&
            orbitTechnologies.map((technology, index) => {
              const angle = (index * (360 / orbitTechnologies.length) * Math.PI) / 180;
              const radius = 210; // Distance from center
              const delay = index * 0.6; // Animation delay

              // Calculate x and y position
              const top = 180 - Math.sin(angle) * radius;
              const left = 180 - Math.cos(angle) * radius;

              return (
                <div
                  key={technology._id}
                  className="absolute w-12 h-12 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15 shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-white/15 z-20 animate-float group"
                  style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    animationDelay: `${delay}s`,
                  }}>
                  <Image
                    src={getImageUrl(technology.logo, 30  , 30, 90)}
                    alt={technology.name}
                    width={30}
                    height={30}
                    className="object-contain filter group-hover:brightness-125 transition-all duration-300"
                  />

                  {/* Technology Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                    <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-xl border border-white/10">
                      {technology.name}
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Main Profile Image */}
          {profilePicture ? (
            <div className="relative h-[320px] w-[320px] z-10">
              {/* Multiple Animated Borders */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 blur-lg animate-pulse" />
              <div className="absolute -inset-1 rounded-full border border-purple-500/40 animate-spin-slow" />
              <div
                className="absolute inset-0 rounded-full border border-blue-500/40 animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDelay: '0.5s' }}
              />
              <div
                className="absolute inset-1 rounded-full border border-pink-500/40 animate-spin-slow"
                style={{ animationDelay: '1s' }}
              />

              {/* Inner Glow */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-pink-500/15 blur-md" />

              <Image
                src={getImageUrl(profilePicture, 320, 320, 100)}
                width={320}
                height={320}
                className="rounded-full border-2 border-white/25 shadow-[0_0_40px_rgba(0,0,0,0.4),0_0_80px_rgba(139,92,246,0.25)] relative z-10 bg-white/5 backdrop-blur-sm object-cover w-full h-full"
                alt={`${name} profile picture`}
                priority
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/15 via-transparent to-transparent z-20 pointer-events-none" />
            </div>
          ) : (
            <div className="relative h-[320px] w-[320px] z-10">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 blur-lg animate-pulse" />
              <div className="w-full h-full rounded-full border-2 border-white/25 shadow-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center text-white text-6xl font-bold relative z-10">
                {name.charAt(0)}
              </div>
            </div>
          )}
        </MouseMoveWrapper>
      </div>
    </div>
  );
}

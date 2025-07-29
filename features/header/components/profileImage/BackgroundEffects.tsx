import { IBackgroundEffectsProps } from '@/features/header/types/header';

export default function BackgroundEffects({ mounted }: IBackgroundEffectsProps) {
  if (!mounted) return null;

  return (
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
  );
}

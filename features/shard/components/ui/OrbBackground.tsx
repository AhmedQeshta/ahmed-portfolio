'use client';

import useMount from '@/features/shard/hooks/useMount';
import useReduceMotion from '@/features/shard/hooks/useReduceMotion';

export default function OrbBackground() {
  const isMounted = useMount();
  const shouldReduceMotion = useReduceMotion();

  // Don't render on server or if motion should be reduced
  if (!isMounted || shouldReduceMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
      style={{ willChange: 'auto' }}>
      {/* Simplified background orbs with CSS animations */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-xl"
        style={{
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl"
        style={{
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '7s',
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-600/10 rounded-full mix-blend-multiply filter blur-xl"
        style={{
          animation: 'float 30s ease-in-out infinite',
          animationDelay: '14s',
        }}
      />

      {/* Additional subtle orbs for depth - only on larger screens */}
      <div className="hidden lg:block">
        <div
          className="absolute top-3/4 right-1/3 w-48 h-48 bg-purple-400/5 rounded-full mix-blend-multiply filter blur-2xl"
          style={{
            animation: 'float 35s ease-in-out infinite',
            animationDelay: '21s',
          }}
        />
        <div
          className="absolute bottom-1/2 left-1/2 w-56 h-56 bg-blue-400/5 rounded-full mix-blend-multiply filter blur-2xl"
          style={{
            animation: 'float 40s ease-in-out infinite',
            animationDelay: '28s',
          }}
        />
      </div>
    </div>
  );
}

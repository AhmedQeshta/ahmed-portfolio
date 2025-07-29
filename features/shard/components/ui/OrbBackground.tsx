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
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      data-testid="orb-background"
      style={{ willChange: 'auto', zIndex: -1 }}>
      {/* Simplified background orbs with CSS animations */}
      <div
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orb-purple rounded-full blur-3xl animate-pulse"
        data-testid="orb-purple"
        style={{
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orb-blue rounded-full blur-3xl animate-pulse"
        data-testid="orb-blue"
        style={{
          animation: 'float 25s ease-in-out infinite',
          animationDelay: '7s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orb-pink rounded-full blur-3xl animate-pulse"
        data-testid="orb-pink"
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

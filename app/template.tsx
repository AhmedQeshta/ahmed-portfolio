'use client';

import LightRays from '@/features/shard/components/ui/LightRays';
import LoadingSpinner from '@/features/shard/components/ui/LoadingSpinner';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import useLoading from '@/features/shard/hooks/useLoading';

export default function Template({ children }: { children: React.ReactNode }) {
  const isLoading = useLoading();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <ScrollAnimation
        direction="up"
        delay={0.2}
        className="absolute inset-0 top-0 z-[-1] min-h-screen">
        <LightRays
          raysOrigin="top-center"
          raysColor="#e941c5"
          raysSpeed={1.5}
          lightSpread={1.5}
          rayLength={100}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.0}
          distortion={0.05}
        />
      </ScrollAnimation>
      {children}
    </>
  );
}

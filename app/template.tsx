'use client';

import LoadingSpinner from '@/features/shard/components/ui/LoadingSpinner';
import useLoading from '@/features/shard/hooks/useLoading';

export default function Template({ children }: { children: React.ReactNode }) {
  const isLoading = useLoading();

  if (isLoading) return <LoadingSpinner />;

  return <>{children}</>;
}

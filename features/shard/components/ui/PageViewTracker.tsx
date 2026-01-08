'use client';

import { usePageView } from '@/features/shard/hooks/usePageView';

export default function PageViewTracker() {
  usePageView();
  return null;
}

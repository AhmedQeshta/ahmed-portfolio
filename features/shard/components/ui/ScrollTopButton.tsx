'use client';

import { ChevronUp } from 'lucide-react';
import useScroll from '@/features/shard/hooks/useScroll';

export default function ScrollTopButton() {
  const { showScrollToTop, scrollToTop } = useScroll();

  if (!showScrollToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="group flex items-center justify-center w-12 h-12 bg-slate-900/80 hover:bg-slate-800/90 text-white rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-gray-500/25"
      aria-label="Scroll to top">
      <ChevronUp size={20} className="group-hover:scale-110 transition-transform duration-200" />
    </button>
  );
}

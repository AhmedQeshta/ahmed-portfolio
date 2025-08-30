'use client';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { IArrow } from '@/features/works/types/work';

// Custom arrow components
export default function Arrow({ onClick, isNext = false }: IArrow) {
  const { isDark } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`custom-slider-arrow absolute ${isNext ? 'right-0 md:-right-8 lg:-right-9' : 'left-0 md:-left-8 lg:-left-9'} top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background ${isDark ? 'text-white' : 'text-black'} w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 `}
      aria-label={isNext ? 'Next slide' : 'Previous slide'}
      type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        {isNext ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
      </svg>
    </button>
  );
}

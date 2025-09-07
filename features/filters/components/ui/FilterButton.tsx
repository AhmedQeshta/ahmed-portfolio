'use client';
import React from 'react';
import { IFilterButton } from '@/features/filters/types/search';
import { AlignLeft, SaveAll, SunMedium, Tag, TagIcon } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

function FilterButton({ name, activeFilter, handleFilter }: IFilterButton) {
  const { isDark } = useTheme();
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        activeFilter === name
          ? `bg-gradient-to-r from-purple-600 to-pink-600 ${isDark ? 'text-white' : 'text-white'} `
          : `bg-btn-filter ${isDark ? 'text-white' : 'text-white'} hover:bg-card-hover hover:text-text-primary`
      } backdrop-blur-sm `}
      type="button"
      onClick={() => handleFilter(name)}>
      <span className="flex items-center gap-2">
        {name === 'all' ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <Tag className="w-4 h-4" size={20} />
        )}
        {name}
      </span>
    </button>
  );
}

export default FilterButton;

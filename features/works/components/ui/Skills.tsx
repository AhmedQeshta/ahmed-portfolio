'use client';

import { IWorkResponse } from '@/features/works/types/work';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Skills({ work: { skills } }: IWorkResponse) {
  const { isDark } = useTheme();
  if (!skills) return null;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Skills & Responsibilities
      </h2>
      <div
        className={`leading-relaxed whitespace-pre-line ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
        {skills}
      </div>
    </div>
  );
}

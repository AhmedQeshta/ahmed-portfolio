'use client';

import { IWorkResponse } from '@/features/works/types/work';
import { Award } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Achievements({ work: { achievements } }: IWorkResponse) {
  if (!achievements || achievements.length == 0) return null;
  const { isDark } = useTheme();

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8`}>
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
        <Award size={28} className="text-yellow-400" />
        Key Achievements
      </h2>
      <ul className="space-y-4">
        {achievements.map((achievement, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
            <span className="leading-relaxed">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

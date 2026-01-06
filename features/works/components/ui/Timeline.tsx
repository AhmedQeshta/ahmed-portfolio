'use client';

import { durationOfWork, formatDate } from '@/features/shard/utils/date';
import { IWorkResponse } from '@/features/works/types/work';
import { Calendar } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Timeline({ work }: IWorkResponse) {
  const { isDark } = useTheme();
  if (!work) return null;

  const { endDate, startDate, current } = work;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <h3
        className={`flex items-center gap-3 text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
        <Calendar size={24} className="text-blue-400" />
        Timeline
      </h3>
      <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Started:</span>
          <span className="font-medium">{formatDate(startDate)}</span>
        </div>
        {endDate && !current && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Ended:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Duration:</span>
          <span className="font-medium">
            {durationOfWork(startDate, endDate || '', current)
              .split('|')[1]
              ?.trim() || 'Current'}
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ProjectResponse } from '@/sanity/lib/types';
import { formatDate } from '@/features/shard/utils/date';
import { IProjectResponse } from '@/features/projects/types/project';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function TimelineProject({ project }: IProjectResponse) {
  const { isDark } = useTheme();
  if (!project) return null;

  const { startDate, endDate } = project;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6 space-y-4`}>
      <h3
        className={`flex items-center gap-3 text-xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
        <Calendar size={24} className="text-blue-400" />
        Timeline
      </h3>
      <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {startDate && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Started:</span>
            <span className="font-medium">{formatDate(startDate)}</span>
          </div>
        )}
        {endDate && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Completed:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

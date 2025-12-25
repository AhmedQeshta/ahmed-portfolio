'use client';

import { getStatusColor } from '@/features/shard/utils/statusColor';
import { IProjectResponse } from '@/features/projects/types/project';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function StatsProject({ project }: IProjectResponse) {
  if (!project) return null;
  const { isDark } = useTheme();

  const { status, technologies, gallery } = project;

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Project Details
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status).replace(
              'border-',
              'border ',
            )}`}>
            {status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        {technologies && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Technologies:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {technologies.length}
            </span>
          </div>
        )}
        {gallery && (
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Gallery Images:</span>
            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {gallery.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

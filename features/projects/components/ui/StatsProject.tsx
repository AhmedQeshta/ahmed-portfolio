'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { getStatusColor } from '@/features/shard/utils/statusColor';
import { IProjectResponse } from '@/features/projects/types/project';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function StatsProject({ project }: IProjectResponse) {
  if (!project) return null;
  const { isDark } = useTheme();

  const { status, technologies, gallery } = project;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <ScrollAnimation direction="down" delay={0.2}>
        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Project Details
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="space-y-3 text-sm">
          <ScrollAnimation direction="down" delay={0.5}>
            <ScrollAnimation direction="down" delay={0.6} className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status).replace(
                  'border-',
                  'border ',
                )}`}>
                {status.replace('-', ' ').toUpperCase()}
              </span>
            </ScrollAnimation>
            {technologies && (
              <ScrollAnimation direction="down" delay={0.7}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Technologies:</span>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    {technologies.length}
                  </span>
                </div>
              </ScrollAnimation>
            )}
            {gallery && (
              <ScrollAnimation direction="down" delay={0.8}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Gallery Images:
                  </span>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    {gallery.length}
                  </span>
                </div>
              </ScrollAnimation>
            )}
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

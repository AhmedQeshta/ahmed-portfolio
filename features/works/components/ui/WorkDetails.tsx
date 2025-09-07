'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { getEmploymentTypeColor, getLocationTypeColor } from '@/features/shard/utils/statusColor';
import { IWorkResponse } from '@/features/works/types/work';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function WorkDetails({ work }: IWorkResponse) {
  if (!work) return null;
  const { isDark } = useTheme();

  const { employmentType, locationType, current } = work;
  return (
    <ScrollAnimation
      direction="down"
      delay={0.3}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-6`}>
      <ScrollAnimation direction="down" delay={0.3}>
        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Work Details
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4}>
        <div className="space-y-3 text-sm">
          <ScrollAnimation direction="down" delay={0.5}>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Type:</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getEmploymentTypeColor(
                  employmentType,
                )}`}>
                {employmentType.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="down" delay={0.6}>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Work Mode:</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getLocationTypeColor(
                  locationType,
                )}`}>
                {locationType?.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </ScrollAnimation>
          {current && (
            <ScrollAnimation className="flex justify-between" direction="down" delay={0.7}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
              <span className="px-2 py-1 rounded text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                ACTIVE
              </span>
            </ScrollAnimation>
          )}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

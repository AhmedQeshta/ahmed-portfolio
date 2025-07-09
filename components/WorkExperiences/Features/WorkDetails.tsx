import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { getEmploymentTypeColor, getLocationTypeColor } from '@/utils/statusColor';

interface IWorkDetails {
  work: WorkExperienceResponse;
}
export default function WorkDetails({ work }: IWorkDetails) {
  if (!work) return null;

  const { employmentType, locationType, current } = work;
  return (
    <ScrollAnimation
      direction="down"
      delay={0.3}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <ScrollAnimation direction="down" delay={0.3}>
        <h3 className="text-xl font-bold text-white mb-4">Work Details</h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4}>
        <div className="space-y-3 text-sm">
          <ScrollAnimation direction="down" delay={0.5}>
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
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
              <span className="text-gray-400">Work Mode:</span>
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
              <span className="text-gray-400">Status:</span>
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

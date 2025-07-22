import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { ProjectResponse } from '@/sanity/lib/types';
import { formatDate } from '@/features/shard/utils/date';
import { IProjectResponse } from '@/features/projects/types/project';
import { Calendar, ExternalLink, Github } from 'lucide-react';

export default function TimelineProject({ project }: IProjectResponse) {
  if (!project) return null;

  const { startDate, endDate } = project;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
          <Calendar size={24} className="text-blue-400" />
          Timeline
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="space-y-3 text-gray-300">
          {startDate && (
            <ScrollAnimation direction="down" delay={0.4}>
              <div className="flex justify-between">
                <span className="text-gray-400">Started:</span>
                <span className="font-medium">{formatDate(startDate)}</span>
              </div>
            </ScrollAnimation>
          )}
          {endDate && (
            <ScrollAnimation direction="down" delay={0.5}>
              <div className="flex justify-between">
                <span className="text-gray-400">Completed:</span>
                <span className="font-medium">{formatDate(endDate)}</span>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { ProjectResponse } from '@/sanity/lib/types';
import { getStatusColor } from '@/utils/statusColor';

interface StateProjectProps {
  project: ProjectResponse;
}

export default function StatsProject({ project }: StateProjectProps) {
  if (!project) return null;

  const { status, technologies, gallery } = project;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <ScrollAnimation direction="down" delay={0.2}>
        <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="space-y-3 text-sm">
          <ScrollAnimation direction="down" delay={0.5}>
            <ScrollAnimation direction="down" delay={0.6} className="flex justify-between">
              <span className="text-gray-400">Status:</span>
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
                  <span className="text-gray-400">Technologies:</span>
                  <span className="font-medium text-gray-200">{technologies.length}</span>
                </div>
              </ScrollAnimation>
            )}
            {gallery && (
              <ScrollAnimation direction="down" delay={0.8}>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gallery Images:</span>
                  <span className="font-medium text-gray-200">{gallery.length}</span>
                </div>
              </ScrollAnimation>
            )}
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

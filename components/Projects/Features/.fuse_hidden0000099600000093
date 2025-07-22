import { ProjectResponse } from '@/sanity/lib/types';
import { getStatusColor } from '@/utils/statusColor';

interface StateProjectProps {
  project: ProjectResponse;
}

export default function StatsProject({ project }: StateProjectProps) {
  if (!project) return null;

  const { status, technologies, gallery } = project;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status).replace('border-', 'border ')}`}>
            {status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        {technologies && (
          <div className="flex justify-between">
            <span className="text-gray-400">Technologies:</span>
            <span className="font-medium text-gray-200">{technologies.length}</span>
          </div>
        )}
        {gallery && (
          <div className="flex justify-between">
            <span className="text-gray-400">Gallery Images:</span>
            <span className="font-medium text-gray-200">{gallery.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}

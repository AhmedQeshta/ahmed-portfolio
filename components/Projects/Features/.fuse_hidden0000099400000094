import { ProjectResponse } from '@/sanity/lib/types';
import { formatDate } from '@/utils/date';
import { Calendar, ExternalLink, Github } from 'lucide-react';

interface TimelineProjectProps {
  project: ProjectResponse;
}

export default function TimelineProject({ project }: TimelineProjectProps) {
  if (!project) return null;

  const { startDate, endDate } = project;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
        <Calendar size={24} className="text-blue-400" />
        Timeline
      </h3>
      <div className="space-y-3 text-gray-300">
        {startDate && (
          <div className="flex justify-between">
            <span className="text-gray-400">Started:</span>
            <span className="font-medium">{formatDate(startDate)}</span>
          </div>
        )}
        {endDate && (
          <div className="flex justify-between">
            <span className="text-gray-400">Completed:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

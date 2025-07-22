import { WorkExperienceResponse } from '@/sanity/lib/types';
import { durationOfWork, formatDate } from '@/utils/date';
import { Calendar } from 'lucide-react';

interface TimelineProps {
  work: WorkExperienceResponse;
}
export default function Timeline({ work }: TimelineProps) {
  if (!work) return null;

  const { endDate, startDate, current } = work;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
        <Calendar size={24} className="text-blue-400" />
        Timeline
      </h3>
      <div className="space-y-3 text-gray-300">
        <div className="flex justify-between">
          <span className="text-gray-400">Started:</span>
          <span className="font-medium">{formatDate(startDate)}</span>
        </div>
        {endDate && !current && (
          <div className="flex justify-between">
            <span className="text-gray-400">Ended:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-400">Duration:</span>
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

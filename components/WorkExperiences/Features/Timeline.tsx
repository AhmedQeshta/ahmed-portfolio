import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { durationOfWork, formatDate } from '@/utils/date';
import { IWorkResponse } from '@/utils/types/work';
import { Calendar } from 'lucide-react';


export default function Timeline({ work }: IWorkResponse) {
  if (!work) return null;

  const { endDate, startDate, current } = work;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <ScrollAnimation direction="down" delay={0.1}>
        <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
          <Calendar size={24} className="text-blue-400" />
          Timeline
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <div className="space-y-3 text-gray-300">
          <ScrollAnimation direction="down" delay={0.3}>
            <div className="flex justify-between">
              <span className="text-gray-400">Started:</span>
              <span className="font-medium">{formatDate(startDate)}</span>
            </div>
          </ScrollAnimation>
          {endDate && !current && (
            <ScrollAnimation direction="down" delay={0.4}>
              <div className="flex justify-between">
                <span className="text-gray-400">Ended:</span>
                <span className="font-medium">{formatDate(endDate)}</span>
              </div>
            </ScrollAnimation>
          )}
          <ScrollAnimation direction="down" delay={0.5}>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="font-medium">
                {durationOfWork(startDate, endDate || '', current)
                  .split('|')[1]
                  ?.trim() || 'Current'}
              </span>
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

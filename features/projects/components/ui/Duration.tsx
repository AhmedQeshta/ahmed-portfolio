import { formatDateDuration } from '@/features/shard/utils/date';
import { Calendar } from 'lucide-react';
import { IDurationProps } from '@/features/projects/types/project';

export default function Duration({ startDate, endDate }: IDurationProps) {
  if (!startDate || !endDate) return null;

  return (
    <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
      <Calendar className="text-text-secondary" size={16} aria-hidden="true" />
      <time className="text-text-secondary">
        {formatDateDuration(startDate ?? '', endDate ?? '')}
      </time>
    </div>
  );
}

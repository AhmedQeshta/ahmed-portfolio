import { formatDate, formatReadingTime } from '@/features/shard/utils/date';
import { Calendar, Clock } from 'lucide-react';
import { IMetaInfoProps } from '../../types/blog';

export default function MetaInfo({ publishedAt, readingTime }: IMetaInfoProps) {
  return (
    <div className="flex items-center justify-between text-text-secondary text-sm">
      <div className="flex items-center gap-2">
        <Calendar className="text-text-secondary" size={16} aria-hidden="true" />
        <time dateTime={publishedAt} className="text-text-secondary">
          {formatDate(publishedAt)}
        </time>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="text-text-secondary" size={16} aria-hidden="true" />
        <span className="text-text-secondary">{formatReadingTime(readingTime)}</span>
      </div>
    </div>
  );
}

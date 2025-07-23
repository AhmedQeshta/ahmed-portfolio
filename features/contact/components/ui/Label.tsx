import { cn } from '@/features/shard/utils/statusColor';
import { IDefaultLabel } from '@/features/contact/types/contact';

export default function Label({ title, customStyle, ...restProps }: IDefaultLabel) {
  return (
    <label
      className={cn('block text-sm text-white mb-1 font-medium', customStyle)}
      data-testid="label"
      {...restProps}>
      {title}
    </label>
  );
}

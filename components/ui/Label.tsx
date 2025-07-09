import { cn } from '@/utils/statusColor';

interface IDefaultLabel {
  title: string;
  htmlFor: string;
  customStyle?: string;
}

export default function Label({ title, customStyle, ...restProps }: IDefaultLabel) {
  return (
    <label
      className={cn('block text-sm text-white mb-1', customStyle)}
      data-testid="label"
      {...restProps}>
      {title}
    </label>
  );
}

import { cn } from '@/utils/statusColor';

interface DefaultLabelInterFace {
  title: string;
  htmlFor: string;
  customStyle?: string;
}

export default function Label({ title, ...restProps }: DefaultLabelInterFace) {
  return (
    <label className={cn('block text-sm text-white mb-1', restProps.customStyle)} {...restProps}>
      {title}
    </label>
  );
}

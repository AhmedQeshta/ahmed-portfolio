import { cn } from '@/features/shard/utils/statusColor';
import { IDefaultTextarea } from '@/features/contact/types/contact';

export default function DefaultTextarea({
  handleInputChange,
  displayErrors = '',
  customStyle,
  ...restProps
}: IDefaultTextarea) {
  return (
    <>
      <textarea
        id={restProps?.name}
        onChange={(e) => handleInputChange([restProps?.name], e.target.value)}
        className={cn(
          `w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 transition-colors ${
            displayErrors
              ? 'border-red-500/50 focus:ring-red-500'
              : 'border-white/30 focus:ring-purple-500'
          }`,
          customStyle,
        )}
        {...restProps}
      />
      {displayErrors && <span className="text-red-400 text-sm mt-1 block">{displayErrors}</span>}
    </>
  );
}

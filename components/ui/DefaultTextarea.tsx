import { cn } from '@/utils/statusColor';

interface DefaultTextareaInterFace {
  handleInputChange: any;
  displayErrors?: string;
  name: string;
  rows?: number;
  value: string;
  placeholder: string;
  customStyle?: string;
}
export default function DefaultTextarea({
  handleInputChange,
  displayErrors = '',
  ...restProps
}: DefaultTextareaInterFace) {
  return (
    <>
      <input
        id={restProps?.name}
        type="text"
        onChange={(e) => handleInputChange([restProps?.name], e.target.value)}
        className={cn(
          `w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 transition-colors ${
            displayErrors
              ? 'border-red-500/50 focus:ring-red-500'
              : 'border-white/30 focus:ring-purple-500'
          }`,
          restProps?.customStyle,
        )}
        {...restProps}
      />
      {displayErrors && <span className="text-red-400 text-sm mt-1 block">{displayErrors}</span>}
    </>
  );
}

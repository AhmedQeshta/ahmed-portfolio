import { cn } from '@/features/shard/utils/statusColor';
import { IDefaultInput } from '@/features/contact/types/contact';

export default function DefaultInput({
  handleInputChange,
  displayErrors = '',
  customStyle,
  ...restProps
}: IDefaultInput) {
  return (
    <>
      <input
        id={restProps?.name}
        type="text"
        onChange={(e) => {
          // Support both direct setState functions and field-value pair functions
          if (typeof handleInputChange === 'function') {
            // Check if it's a setState function (only expects one parameter)
            if (handleInputChange.length <= 1) {
              handleInputChange(e.target.value);
            } else {
              // It's a field-value pair function (expects field name and value)
              handleInputChange(restProps?.name, e.target.value);
            }
          }
        }}
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

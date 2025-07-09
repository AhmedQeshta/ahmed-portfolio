import { cn } from '@/utils/statusColor';

interface DefaultInputInterFace extends React.InputHTMLAttributes<HTMLInputElement> {
  handleInputChange: any;
  displayErrors?: string;
  customStyle?: string;
}

export default function DefaultInput({
  handleInputChange,
  displayErrors = '',
  customStyle,
  ...restProps
}: DefaultInputInterFace) {
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
          customStyle,
        )}
        {...restProps}
      />
      {displayErrors && <span className="text-red-400 text-sm mt-1 block">{displayErrors}</span>}
    </>
  );
}

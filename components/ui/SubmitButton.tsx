import { cn } from '@/utils/statusColor';
import { ISubmitButton } from '@/utils/types/contact';

export default function SubmitButton({ isPending, customStyle, ...restProps }: ISubmitButton) {
  return (
    <button
      type="submit"
      className={cn(
        'px-6 py-3 gradient-button-primary rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity',
        customStyle,
      )}
      disabled={isPending}
      {...restProps}>
      {isPending ? 'Sending ...' : 'Send Message'}
    </button>
  );
}

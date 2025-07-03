import { cn } from '@/utils/statusColor';

interface SubmitButtonInterface {
  isPending: boolean;
  customStyle?: string;
}

export default function SubmitButton({ isPending, ...restProps }: SubmitButtonInterface) {
  return (
    <button
      type="submit"
      className={cn(
        'px-6 py-3 gradient-button-primary rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity',
        restProps?.customStyle,
      )}
      disabled={isPending}
      {...restProps}>
      {isPending ? 'Sending ...' : 'Send Message'}
    </button>
  );
}

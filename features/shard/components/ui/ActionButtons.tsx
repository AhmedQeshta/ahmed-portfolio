import { cn } from '@/features/shard/utils/statusColor';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { IActionButtons } from '@/features/shard/types/common';

export default function ActionButtons({ listLinks }: IActionButtons) {
  if (!listLinks) return null;

  return (
    <ScrollAnimation direction="down" delay={0.4} className="flex gap-4">
      {listLinks?.map(({ id, text, link, customStyle, icon }) => {
        // Only render if link exists and is not empty
        if (!link || link.trim() === '') {
          return null;
        }

        return (
          <OptimizedLink
            key={id}
            href={link}
            className={cn(customStyle, 'flex items-center gap-2 hover:text-blue-400')}>
            {icon && icon}
            {text}
          </OptimizedLink>
        );
      })}
    </ScrollAnimation>
  );
}

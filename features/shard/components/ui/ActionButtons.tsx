'use client';

import { cn } from '@/features/shard/utils/statusColor';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { IActionButtons } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ActionButtons({ listLinks }: IActionButtons) {
  if (!listLinks) return null;
  const { isDark } = useTheme();

  return (
    <ScrollAnimation direction="down" delay={0.4} className="grid grid-cols-2 gap-4">
      {listLinks?.map(({ id, text, link, customStyle, icon }) => {
        // Only render if link exists and is not empty
        if (!link || link.trim() === '') {
          return null;
        }

        // Apply theme-aware styling
        const themedStyle = isDark
          ? customStyle
          : customStyle
              ?.replace('bg-gray-800', 'bg-gray-300')
              ?.replace('hover:bg-gray-700', 'hover:bg-gray-200')
              ?.replace('border-gray-700', 'border-gray-300');

        return (
          <OptimizedLink
            key={id}
            href={link}
            className={cn(
              themedStyle,
              `flex items-center gap-2 justify-center  ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`,
            )}>
            {icon && icon}
            {text}
          </OptimizedLink>
        );
      })}
    </ScrollAnimation>
  );
}

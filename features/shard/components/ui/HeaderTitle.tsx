'use client';
import { HeaderTitleProps } from '@/features/shard/types/common';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { cn } from '@/features/shard/utils/statusColor';
import { DELAY_PATTERNS } from '@/features/shard/utils/animations';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function HeaderTitle({ title, subtitle, className }: HeaderTitleProps) {
  const { isDark } = useTheme();

  return (
    <div className={cn('text-center mb-14 lg:mb-16', className)}>
      <ScrollAnimation direction="down" delay={DELAY_PATTERNS.sequential.first} duration={0.3}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span
            className={`${isDark ? 'gradient-text' : 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent '}`}>
            {title}
          </span>
        </h2>
      </ScrollAnimation>

      <ScrollAnimation direction="down" delay={DELAY_PATTERNS.sequential.second} duration={0.3}>
        <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </ScrollAnimation>
    </div>
  );
}

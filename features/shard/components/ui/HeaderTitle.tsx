import { HeaderTitleProps } from '@/features/shard/types/common';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { cn } from '../../utils/statusColor';

export default function HeaderTitle({ title, subtitle, className }: HeaderTitleProps) {
  return (
    <div className={cn('text-center mb-14 lg:mb-16', className)}>
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">{title}</span>
        </h2>
      </ScrollAnimation>

      <ScrollAnimation direction="down" delay={0.3}>
        <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </ScrollAnimation>
    </div>
  );
}

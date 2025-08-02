import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { EmptyItemProps } from '@/features/shard/types/common';

export default function EmptyItem({ title, subTitle, icon = null }: EmptyItemProps) {
  return (
    <ScrollAnimation direction="down" delay={0.3}>
      <div className="text-center py-16">
        <div className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
          {icon && <div className="text-6xl mb-4">{icon}</div>}
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-text-secondary">{subTitle}</p>
        </div>
      </div>
    </ScrollAnimation>
  );
}

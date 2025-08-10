import { ILinkNavigation } from '@/features/shard/types/common';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function ReadMore({ link, text, readMore, dataLength }: ILinkNavigation) {
  if (!readMore || !dataLength || dataLength <= 0) return null;
  return (
    <ScrollAnimation direction="up" delay={0.3}>
      <div className="text-center mt-12">
        <div className="flex justify-center mt-12">
          <OptimizedLink
            href={link}
            className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
            {text}
          </OptimizedLink>
        </div>
      </div>
    </ScrollAnimation>
  );
}

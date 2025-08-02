import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';
import { ILinkNavigation } from '@/features/shard/types/common';

export default function ReadMore({ link, text, readMore, dataLength }: ILinkNavigation) {
  if (!readMore || dataLength <= 0) return null;
  return (
    <ScrollAnimation direction="up" delay={0.3}>
      <div className="text-center mt-12">
        <div className="flex justify-center mt-12">
          <Link
            href={link}
            className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
            {text}
          </Link>
        </div>
      </div>
    </ScrollAnimation>
  );
}

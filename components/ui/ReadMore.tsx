import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';
import { ILinkNavigation } from '@/utils/types/common';

export default function ReadMore({ link, text }: ILinkNavigation) {
  return (
    <ScrollAnimation direction="down" delay={0.3} className="flex justify-center mt-12">
      <Link href={link} className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
        {text}
      </Link>
    </ScrollAnimation>
  );
}

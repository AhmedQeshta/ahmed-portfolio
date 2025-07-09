import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

interface IReadMore {
  link: string;
  text: string;
}

export default function ReadMore({ link, text }: IReadMore) {
  return (
    <ScrollAnimation direction="down" delay={0.3} className="flex justify-center mt-12">
      <Link href={link} className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
        {text}
      </Link>
    </ScrollAnimation>
  );
}

import Link from 'next/link';
import { INavLinks } from '../../types/navbar';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function NavLinks({ links }: INavLinks) {
  return (
    <div className="hidden lg:flex items-center space-x-1">
      {links?.map(({ id, name, url }, index) => (
        <ScrollAnimation
          key={id}
          direction="up"
          delay={0.05 * (index / 2)}
          className="py-2 text-text-secondary hover:text-white hover:bg-purple-500/10 rounded-lg transition-all duration-200 text-sm font-medium">
          <Link
            className="px-4 py-2"
            key={id}
            href={url}
            prefetch={true}
            scroll={url.startsWith('#')}>
            {name}
          </Link>
        </ScrollAnimation>
      ))}
    </div>
  );
}

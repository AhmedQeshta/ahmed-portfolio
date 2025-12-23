import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { INavLinks } from '@/features/navbar/types/navbar';

export default function NavLinks({ links }: INavLinks) {
  return (
    <div className="hidden lg:flex items-center space-x-1 bg-items-nav p-2 rounded-full">
      {links?.map(({ id, name, url }, index) => (
        <div
          key={id}
          className="py-2 items-nav rounded-full transition-all duration-200 text-sm font-semibold">
          <OptimizedLink className="px-4 py-2" href={url} scroll={url.startsWith('#')}>
            {name}
          </OptimizedLink>
        </div>
      ))}
    </div>
  );
}

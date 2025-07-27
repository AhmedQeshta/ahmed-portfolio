import Link from 'next/link';
import { mediaList } from '@/features/navbar/utils/navLinks';
import { IMenu } from '@/features/navbar/types/navbar';

export default function Menu({ links, closeMobileMenu, isMobileMenuOpen }: IMenu) {
  return (
    <div
      className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
      <div className="border-t border-purple-500/20 pt-4">
        {/* Mobile Navigation Links */}
        <div className="space-y-2 mb-6">
          {links?.map(({ id, name, url }) => (
            <Link
              key={id}
              href={url}
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-text-secondary hover:text-white hover:bg-purple-500/10 rounded-lg transition-all duration-200 text-base font-medium">
              {name}
            </Link>
          ))}
        </div>

        {/* Mobile Social Icons */}
        <div className="border-t border-purple-500/20 pt-4">
          <p className="text-text-secondary text-sm font-medium mb-3 px-4">Connect with me</p>
          <div className="flex flex-wrap gap-3 px-4">
            {mediaList?.map(({ title, href, iconSvg, rel, target }) => {
              const { fill, viewBox, className, path } = iconSvg || {};
              return (
                <a
                  key={title}
                  href={href}
                  target={target}
                  rel={rel}
                  aria-label={title}
                  className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200">
                  <svg fill={fill} viewBox={viewBox} className="w-5 h-5">
                    <path d={path?.d} />
                  </svg>
                  <span className="text-sm font-medium">{title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { mediaList } from '@/features/navbar/utils/navLinks';
import { IMenu } from '@/features/navbar/types/navbar';

export default function Menu({ links, closeMobileMenu, isMobileMenuOpen }: IMenu) {
  return (
    <div
      className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
      role="menu"
      aria-hidden={!isMobileMenuOpen}
      aria-label="Mobile navigation menu">
      <div className="border-t border-purple-500/20 pt-4">
        {/* Mobile Navigation Links */}
        <nav className="space-y-2 mb-6" role="navigation" aria-label="Mobile navigation">
          {links?.map(({ id, name, url }) => (
            <Link
              key={id}
              href={url}
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-text-secondary hover:text-white hover:bg-purple-500/10 rounded-lg transition-all duration-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
              role="menuitem"
              aria-label={`Navigate to ${name} section`}
              title={`Go to ${name} section`}>
              {name}
            </Link>
          ))}
        </nav>

        {/* Mobile Social Icons */}
        <div className="border-t border-purple-500/20 pt-4">
          <h3 className="text-text-secondary text-sm font-medium mb-3 px-4">Connect with me</h3>
          <div className="flex flex-wrap gap-3 px-4" role="list" aria-label="Social media links">
            {mediaList?.map(({ title, href, iconSvg, rel, target }) => {
              const { fill, viewBox, className, path } = iconSvg || {};
              return (
                <a
                  key={title}
                  href={href}
                  target={target}
                  rel={rel}
                  aria-label={`Visit my ${title} profile (opens in new tab)`}
                  title={`Visit my ${title} profile`}
                  className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                  role="listitem">
                  <svg
                    fill={fill}
                    viewBox={viewBox}
                    className="w-5 h-5"
                    aria-hidden="true"
                    focusable="false">
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

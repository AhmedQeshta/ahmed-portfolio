import { mediaList } from '@/features/navbar/utils/navLinks';

export default function SocialIcons() {
  return (
    <div className="hidden lg:flex items-center space-x-3 bg-items-nav p-2 rounded-full">
      {mediaList?.map(({ title, href, iconSvg, rel, target }, index) => {
        const { fill, viewBox, className, path } = iconSvg || {};
        return (
          <div
            key={index}
            className="w-8 h-8 p-1.5 items-nav  rounded-full transition-all duration-200 hover:scale-110">
            <a href={href} target={target} rel={rel} aria-label={title}>
              <svg fill={fill} viewBox={viewBox} className={'w-full h-full'}>
                <path d={path?.d} />
              </svg>
            </a>
          </div>
        );
      })}
    </div>
  );
}

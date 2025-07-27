import { mediaList } from '@/features/navbar/utils/navLinks';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function SocialIcons() {
  return (
    <div className="hidden lg:flex items-center space-x-3">
      {mediaList?.map(({ title, href, iconSvg, rel, target }, index) => {
        const { fill, viewBox, className, path } = iconSvg || {};
        return (
          <ScrollAnimation
            direction="up"
            delay={0.05 * (index / 2)}
            className="w-8 h-8 p-1.5 text-text-secondary hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 hover:scale-110">
            <a key={title} href={href} target={target} rel={rel} aria-label={title}>
              <svg fill={fill} viewBox={viewBox} className={'w-full h-full'}>
                <path d={path?.d} />
              </svg>
            </a>
          </ScrollAnimation>
        );
      })}
    </div>
  );
}

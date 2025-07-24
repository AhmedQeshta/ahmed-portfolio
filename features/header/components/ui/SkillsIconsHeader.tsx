import { getImageUrl } from '@/sanity/lib/image';
import { ITechnologiesResponse } from '@/features/shard/types/technology';
import Image from 'next/image';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function SkillsIconsHeader({ technologies }: ITechnologiesResponse) {
  if (!technologies || technologies.length === 0) {
    return null;
  }
  // Take remaining technologies starting after the first 8 (used in ProfileImage orbit)
  const remainingTechnologies = technologies?.slice(8) || [];

  return (
    <div className="mt-10">
      <ScrollAnimation direction="up" delay={0.1} className="text-center lg:text-left my-5">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Core Technologies</h3>
        <p className="text-gray-400">Technologies I work with</p>
      </ScrollAnimation>

      <div className="flex flex-wrap gap-3 w-full">
        {remainingTechnologies.map(({ _id, logo, name }, index) => (
          <ScrollAnimation direction="up" delay={0.1 * (index / 2)}>
            <div key={_id} className="group relative" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl backdrop-blur-sm">
                <Image
                  src={getImageUrl(logo, 24, 24, 90)}
                  alt={name}
                  width={24}
                  height={24}
                  className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>

              {/* Enhanced Tooltip */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                  {name}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10" />
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}

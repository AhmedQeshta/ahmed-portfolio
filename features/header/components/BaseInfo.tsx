import SkillsIconsHeader from '@/features/header/components/ui/SkillsIconsHeader';
import { PortableText } from '@portabletext/react';
import { IBaseInfoResponse } from '@/features/header/types/header';
import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';

export default function BaseInfo({ baseInfo }: IBaseInfoResponse) {
  const { name, bio, technologies } = baseInfo;

  // Take remaining technologies starting after the first 8 (used in ProfileImage orbit)
  const remainingTechnologies = technologies?.slice(8) || [];

  return (
    <div className="space-y-10">
      {/* Main Heading */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
            {name}
          </h1>

          {/* Subtitle/Role */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90 leading-tight">
              Software Engineer
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <div className="h-1 w-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-300 text-lg leading-relaxed">
            <PortableText value={bio} />
          </div>
        </div>
      </div>

      {/* Core Technologies - Remaining technologies after first 8 */}
      {remainingTechnologies && remainingTechnologies.length > 0 && (
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Core Technologies</h3>
            <p className="text-gray-400">Technologies I work with</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 lg:gap-8">
            {remainingTechnologies.map((technology, index) => (
              <div
                key={technology._id}
                className="group relative"
                style={{ animationDelay: `${index * 80}ms` }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <Image
                    src={getImageUrl(technology.logo, 32, 32, 90)}
                    alt={technology.name}
                    width={24}
                    height={24}
                    className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>

                {/* Enhanced Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                  <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                    {technology.name}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

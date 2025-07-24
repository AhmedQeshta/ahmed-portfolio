import { PortableText } from '@portabletext/react';
import { IBaseInfoResponse } from '@/features/header/types/header';
import SkillsIconsHeader from '@/features/header/components/ui/SkillsIconsHeader';

export default function BaseInfo({ baseInfo }: IBaseInfoResponse) {
  const { name, bio, technologies, title } = baseInfo;

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
              {/* {title[0]} */}
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
    </div>
  );
}

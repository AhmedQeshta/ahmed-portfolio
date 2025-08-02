import { PortableText } from '@portabletext/react';
import { IBaseInfoResponse } from '@/features/header/types/header';
import Typewriter from '@/features/header/components/ui/Typewriter';

export default function BaseInfo({ baseInfo }: IBaseInfoResponse) {
  const { name, bio, title } = baseInfo;

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
            <Typewriter titles={title} />
          </div>
        </div>

        {/* Bio Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-300 text-lg leading-relaxed text-justify flex flex-col gap-4">
            <PortableText value={bio} />
          </div>
        </div>
      </div>
    </div>
  );
}

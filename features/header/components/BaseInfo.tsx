import { PortableText } from '@portabletext/react';
import { IBaseInfoResponse } from '@/features/header/types/header';
import Typewriter from '@/features/header/components/ui/Typewriter';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';

export default function BaseInfo({ baseInfo }: IBaseInfoResponse) {
  const { name, bio, title, cvUrl } = baseInfo;

  return (
    <div className="space-y-10">
      {/* Main Heading */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl gradient-text leading-tight font-bold gradient-text animate-pulse">
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

            {cvUrl && (
              <div>
                <OptimizedLink
                  href={cvUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-button-primary text-white shadow-md hover:shadow-lg transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  download>
                  Download CV
                </OptimizedLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

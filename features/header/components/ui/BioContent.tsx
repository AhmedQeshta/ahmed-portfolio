'use client';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { PortableText } from 'next-sanity';
import { IBioContent } from '@/features/header/types/header';

export default function BioContent({ bio, cvUrl }: IBioContent) {
  const { isDark } = useTheme();

  return (
    <div className="prose prose-lg max-w-none">
      <div className={`text-lg leading-relaxed text-justify flex flex-col gap-4 text-text-primary`}>
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
  );
}

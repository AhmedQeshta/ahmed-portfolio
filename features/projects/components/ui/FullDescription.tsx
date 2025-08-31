'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectResponse } from '@/features/projects/types/project';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { portableTextComponents } from '@/features/shard/components/ui/PortableTextComponents';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function FullDescription({ project }: IProjectResponse) {
  if (!project) return null;
  const { isDark } = useTheme();

  const { fullDescription } = project;

  // Handle empty or invalid fullDescription
  if (!fullDescription || (Array.isArray(fullDescription) && fullDescription.length === 0)) {
    return null;
  }

  return (
    <ScrollAnimation direction="down" delay={0.1} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
          About This Project
        </h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
          <PortableText
            value={fullDescription}
            components={portableTextComponents as unknown as PortableTextComponents}
          />
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

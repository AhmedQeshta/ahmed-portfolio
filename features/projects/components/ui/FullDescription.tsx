'use client';

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
    <div className="space-y-4">
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
        About This Project
      </h2>
      <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
        <PortableText
          value={fullDescription}
          components={portableTextComponents as unknown as PortableTextComponents}
        />
      </div>
    </div>
  );
}

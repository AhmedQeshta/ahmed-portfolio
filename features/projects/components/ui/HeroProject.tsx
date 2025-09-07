'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Categories from '@/features/shard/components/ui/Categories';
import { getStatusColor } from '@/features/shard/utils/statusColor';
import { IProjectResponse } from '@/features/projects/types/project';
import Image from 'next/image';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function HeroProject({ project }: IProjectResponse) {
  if (!project) return null;
  const { isDark } = useTheme();

  const { screenshot, title, status, description, categories } = project;
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <Image src={screenshot} alt={title} fill className="object-cover" priority />

      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isDark
            ? 'from-black via-black/50 to-transparent'
            : 'from-white via-white/50 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          isDark
            ? 'from-black/30 via-transparent to-black/30'
            : 'from-white/30 via-transparent to-white/30'
        }`}
      />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories */}
          <Categories categories={categories || []} delay={0.2} className="mb-4" />

          {/* Status Badge */}
          <ScrollAnimation direction="down" delay={0.1}>
            <ScrollAnimation direction="down" delay={0.3} className="mb-4">
              <span
                className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(
                  status,
                )}`}>
                {status.replace('-', ' ').toUpperCase()}
              </span>
            </ScrollAnimation>

            {/* Title and Description */}
            <ScrollAnimation direction="down" delay={0.4}>
              <h1
                className={`text-4xl md:text-6xl font-bold mb-4 leading-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {title}
              </h1>
            </ScrollAnimation>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}

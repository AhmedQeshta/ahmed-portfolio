'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectGalleryProps, IProjectResponse } from '@/features/projects/types/project';
import Galleries from '@/features/projects/components/projectGallery/Galleries';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ProjectGallery({ project, openModal }: IProjectGalleryProps) {
  const { title, gallery } = project;
  const { isDark } = useTheme();

  if (!gallery || gallery.length == 0) return null;

  return (
    <ScrollAnimation direction="down" delay={0.1} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Gallery
        </h2>
      </ScrollAnimation>
      <Galleries gallery={gallery} title={title} openModal={openModal} />
    </ScrollAnimation>
  );
}

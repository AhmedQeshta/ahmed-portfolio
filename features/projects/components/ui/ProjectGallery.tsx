import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectGalleryProps, IProjectResponse } from '@/features/projects/types/project';
import Galleries from '../ProjectGallery/Galleries';

export default function ProjectGallery({ project, openModal }: IProjectGalleryProps) {
  const { title, gallery } = project;
  if (!gallery || gallery.length == 0) return null;

  return (
    <ScrollAnimation direction="down" delay={0.1} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
      </ScrollAnimation>
      <Galleries gallery={gallery} title={title} openModal={openModal} />
    </ScrollAnimation>
  );
}

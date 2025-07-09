import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { ProjectResponse } from '@/sanity/lib/types';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface IProjectGallery {
  project: ProjectResponse;
}

export default function ProjectGallery({ project }: IProjectGallery) {
  if (!project.gallery || project.gallery.length == 0) return null;

  const { title, gallery } = project;

  return (
    <ScrollAnimation direction="down" delay={0.1} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((image, index) => (
            <ScrollAnimation
              direction="down"
              delay={0.4 + index * 0.1}
              key={index}
              className="group relative aspect-video rounded-lg overflow-hidden bg-gray-800">
              <Image
                src={image}
                alt={`${title} gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </ScrollAnimation>
          ))}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

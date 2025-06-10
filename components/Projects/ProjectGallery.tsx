import { ProjectResponse } from '@/sanity/lib/types';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface ProjectGalleryProps {
  project: ProjectResponse;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  if (!project.gallery || project.gallery.length == 0) return null;

  const { title, gallery } = project;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-video rounded-lg overflow-hidden bg-gray-800">
            <Image
              src={image}
              alt={`${title} gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

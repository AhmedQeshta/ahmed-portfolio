import { ProjectResponse } from '@/sanity/lib/types';
import { formatDate } from '@/utils/date';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { PortableText } from 'next-sanity';

interface FullDescriptionProps {
  project: ProjectResponse;
}

export default function FullDescription({ project }: FullDescriptionProps) {
  if (!project) return null;

  const { fullDescription } = project;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        About This Project
      </h2>
      <div className="prose prose-invert prose-lg max-w-none">
        <PortableText value={fullDescription} />
      </div>
    </div>
  );
}

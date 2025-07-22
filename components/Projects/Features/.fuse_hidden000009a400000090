import { ProjectResponse } from '@/sanity/lib/types';
import { PortableText } from '@portabletext/react';

interface FullDescriptionProps {
  project: ProjectResponse;
}

export default function FullDescription({ project }: FullDescriptionProps) {
  if (!project) return null;

  const { fullDescription } = project;

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        About This Project
      </h2>
      <div className="prose prose-invert prose-lg max-w-none">
        <PortableText value={fullDescription} />
      </div>
    </>
  );
}

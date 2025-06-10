import { ProjectResponse } from '@/sanity/lib/types';
import { ExternalLink, Github } from 'lucide-react';

interface ActionButtonsProps {
  project: ProjectResponse;
}

export default function ActionButtons({ project }: ActionButtonsProps) {
  if (!project) return null;
  const { liveUrl, repoUrl } = project;
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <ExternalLink size={20} />
          Live Demo
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-700">
          <Github size={20} />
          Source Code
        </a>
      )}
    </div>
  );
}

import { TechnologyResponse } from '@/sanity/lib/types';
import { Tag } from 'lucide-react';

interface TechnologiesProps {
  technologies: TechnologyResponse[];
}

export default function Technologies({ technologies }: TechnologiesProps) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
      <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
        <Tag size={24} className="text-purple-400" />
        Technologies
      </h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech._id}
            className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition-colors">
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}

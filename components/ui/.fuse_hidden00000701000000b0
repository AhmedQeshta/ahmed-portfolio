import { TechnologyResponse } from '@/sanity/lib/types';
import { Tag } from 'lucide-react';

interface TagsProps {
  tags?: string[];
}

export default function Tags({ tags }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
      <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

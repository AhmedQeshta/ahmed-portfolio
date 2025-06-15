import Link from 'next/link';
import { ProjectResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import { formatDateDuration } from '@/utils/date';
import TechnologiesHome from '@/components/ui/TechnologiesHome';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import ActionButtons from '@/components/ui/ActionButtons';

interface ProjectCardProps {
  project: ProjectResponse;
}

export default function ProjectCard({
  project: {
    slug,
    _id,
    screenshot,
    title,
    technologies,
    startDate,
    endDate,
    description,
    liveUrl,
    repoUrl,
  },
}: ProjectCardProps) {
  const listLinks = [
    {
      id: 1,
      text: 'Live Demo',
      link: liveUrl,
      customStyle:
        'text-sm text-white/80 hover:text-white underline bg-gradient-to-br from-purple-500 to-pink-500 rounded-md px-2 py-2',
    },
    {
      id: 2,
      text: 'GitHub',
      link: repoUrl,
      customStyle:
        'text-sm text-white/80 hover:text-white underline bg-gradient-to-br from-purple-500 to-pink-500 rounded-md px-2 py-2',
    },
  ];
  return (
    <Link
      href={`/projects/${slug}`}
      key={_id}
      className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition cursor-pointer">
      <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        {screenshot ? (
          <Image
            src={getImageUrl(screenshot, 200, 140, 100)}
            alt={title}
            width={200}
            height={140}
            className="object-contain"
            priority
          />
        ) : (
          <span className="text-white text-4xl font-bold">{title.charAt(0)}</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Technologies */}
        <TechnologiesHome technologies={technologies} link={`/projects/${slug}`} />

        {/* Duration */}
        <p className="text-text-secondary text-sm mb-4 font-medium flex items-center gap-2">
          <Calendar className="text-text-secondary" size={16} />
          <span className="text-text-secondary px-1">
            {formatDateDuration(startDate ?? '', endDate ?? '')}
          </span>
        </p>

        {description && (
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">{description}</p>
        )}

        <div className="flex gap-4">
          <ActionButtons listLinks={listLinks} />
        </div>
      </div>
    </Link>
  );
}

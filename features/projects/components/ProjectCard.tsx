import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import { formatDateDuration } from '@/features/shard/utils/date';
import TechnologiesHome from '@/features/shard/components/ui/TechnologiesHome';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import MouseMoveWrapper from '@/features/shard/components/ui/MouseMoveWrapper';
import { IProjectResponse } from '@/features/projects/types/project';

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
}: IProjectResponse) {
  return (
    <MouseMoveWrapper>
      <div className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-card-hover transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl relative z-10 min-h-[500px] flex flex-col">
        {/* Project Image Header */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10">
          {screenshot ? (
            <Image
              src={getImageUrl(screenshot, 400, 280, 100)}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{title.charAt(0)}</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Project Content */}
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Title */}
          <Link href={`/projects/${slug}`} className="block" prefetch={true}>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>

          {/* Technologies */}
          <TechnologiesHome technologies={technologies} link={`/projects/${slug}`} />

          {/* Duration */}
          <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
            <Calendar className="text-text-secondary" size={16} />
            <span className="text-text-secondary">
              {formatDateDuration(startDate ?? '', endDate ?? '')}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed flex-1">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            {/* View Details Link */}
            <Link
              href={`/projects/${slug}`}
              prefetch={true}
              className="flex items-center gap-2 text-text-accent text-sm font-medium hover:text-white transition-colors">
              <span>View Details</span>
              <ExternalLink className="w-4 h-4 text-text-accent group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </MouseMoveWrapper>
  );
}

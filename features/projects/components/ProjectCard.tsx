import Link from 'next/link';
import TechnologiesDisplay from '@/features/shard/components/ui/TechnologiesDisplay';
import { ExternalLink, Eye } from 'lucide-react';
import MouseMoveWrapper from '@/features/shard/components/ui/MouseMoveWrapper';
import { IProjectResponse } from '@/features/projects/types/project';
import Duration from '@/features/projects/components/ui/Duration';
import StatusBadges from '@/features/projects/components/ui/StatusBadges';
import ImageHeader from '@/features/shard/components/ui/ImageHeader';

export default function ProjectCard({
  project: {
    slug,
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
      <Link
        href={`/projects/${slug}`}
        prefetch={true}
        aria-label={`View project details: ${title}`}
        className="block h-full group">
        <article className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-card-hover transition-all duration-300 group-hover:scale-[1.02] hover:shadow-2xl relative z-10 min-h-[500px] flex flex-col h-full">
          {/* Project Image Header - Enhanced Design */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10">
            <ImageHeader image={screenshot} title={title} />

            {/* Enhanced Hover Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Floating View Indicator */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-gray-800 text-xs font-medium flex items-center gap-1">
                <Eye className="w-3 h-3" />
                View
              </span>
            </div>

            {/* Project Status Badges */}
            <StatusBadges liveUrl={liveUrl} repoUrl={repoUrl} />
          </div>

          {/* Project Content */}
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Title - Now as heading without nested link */}
            <header>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                {title}
              </h3>
            </header>

            {/* Technologies - Using non-link version */}
            <TechnologiesDisplay technologies={technologies} />

            {/* Duration */}
            <Duration startDate={startDate} endDate={endDate} />

            {/* Description */}
            {description && (
              <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed flex-1">
                {description}
              </p>
            )}

            {/* Call to Action - Visual only, no separate link */}
            <div className="flex items-center justify-end pt-4 border-t border-white/10 mt-auto">
              <div className="flex items-center gap-2 text-text-accent text-sm font-medium group-hover:text-white transition-colors">
                <span>View Details</span>
                <ExternalLink className="w-4 h-4 text-text-accent group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </MouseMoveWrapper>
  );
}

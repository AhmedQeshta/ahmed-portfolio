import { getImageUrl } from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import TechnologiesDisplay from '@/features/shard/components/ui/TechnologiesDisplay';
import { formatDate, formatReadingTime } from '@/features/shard/utils/date';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import MouseMoveWrapper from '@/features/shard/components/ui/MouseMoveWrapper';
import { IBlogPostResponse } from '@/features/blogs/types/blog';

export default async function BlogCard({ blog }: IBlogPostResponse) {
  const { _id, slug, thumbnail, title, technologies, publishedAt, readingTime, description } = blog;

  return (
    <MouseMoveWrapper>
      <Link
        href={`/blogs/${slug}`}
        prefetch={true}
        aria-label={`Read article: ${title}`}
        className="block h-full group">
        <article className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-card-hover transition-all duration-300 group-hover:scale-[1.02] hover:shadow-2xl relative z-10 min-h-[500px] flex flex-col h-full">
          {/* Blog Image Header - Enhanced Design */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10">
            {thumbnail ? (
              <Image
                src={getImageUrl(thumbnail, 600, 400, 90)}
                alt={`Cover image for ${title}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 via-violet-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-5xl font-bold drop-shadow-lg">
                  {title.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Enhanced Hover Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Floating Read Indicator */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-gray-800 text-xs font-medium flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Read
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Title - Now as heading without nested link */}
            <header>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                {title}
              </h3>
            </header>

            {/* Technologies - Using non-link version */}
            <TechnologiesDisplay technologies={technologies} />

            {/* Meta Information */}
            <div className="flex items-center justify-between text-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="text-text-secondary" size={16} aria-hidden="true" />
                <time dateTime={publishedAt} className="text-text-secondary">
                  {formatDate(publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-text-secondary" size={16} aria-hidden="true" />
                <span className="text-text-secondary">{formatReadingTime(readingTime)}</span>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed flex-1">
                {description}
              </p>
            )}

            {/* Call to Action - Visual only, no separate link */}
            <div className="flex items-center justify-end pt-4 border-t border-white/10 mt-auto">
              <div className="flex items-center gap-2 text-text-accent text-sm font-medium group-hover:text-white transition-colors">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 text-text-accent group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </MouseMoveWrapper>
  );
}

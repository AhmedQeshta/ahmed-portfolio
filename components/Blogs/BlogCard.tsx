import { getImageUrl } from '@/sanity/lib/image';
import { BlogPostResponse } from '@/sanity/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import TechnologiesHome from '@/components/ui/TechnologiesHome';
import { formatDate, formatReadingTime } from '@/utils/date';
import { Calendar, Clock } from 'lucide-react';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import SeeBlogButton from '@/components/Blogs/Features/SeeBlogButton';
import MouseMoveWrapper from '@/components/ui/MouseMoveWrapper';

interface BlogCardProps {
  blog: BlogPostResponse;
}

export default async function BlogCard({ blog }: BlogCardProps) {
  const { _id, slug, thumbnail, title, technologies, publishedAt, readingTime, description } = blog;
  return (
    <MouseMoveWrapper>
      <ScrollAnimation
        key={_id}
        direction="down"
        delay={0.1}
        className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition">
        <Link href={`blogs/${slug}`}>
          {thumbnail ? (
            <Image
              src={getImageUrl(thumbnail, 200, 140, 100)}
              alt={title}
              width={200}
              height={140}
              className="object-cover w-full h-48"
              priority
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{title.charAt(0)}</span>
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1 capitalize">
              {title}
            </h3>

            {/* Technologies */}
            <TechnologiesHome technologies={technologies} link={`/blogs/${slug}`} />

            <div className="flex justify-between">
              {/* Duration */}
              <p className="text-text-secondary text-sm mb-4 font-medium flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-text-secondary px-1">{formatDate(publishedAt)}</span>
              </p>

              {/* readingTime */}
              <p className="text-text-secondary text-sm mb-4 font-medium flex items-center gap-2">
                <Clock size={16} />
                <span className="text-text-secondary px-1">{formatReadingTime(readingTime)}</span>
              </p>
            </div>

            {description && (
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">{description}</p>
            )}

            <div className="flex gap-4">
              <SeeBlogButton slug={slug} />
            </div>
          </div>
        </Link>
      </ScrollAnimation>
    </MouseMoveWrapper>
  );
}

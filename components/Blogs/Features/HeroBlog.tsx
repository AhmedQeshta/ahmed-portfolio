import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { BlogPostResponse, TechnologyResponse } from '@/sanity/lib/types';
import { formatDate, formatReadingTime } from '@/utils/date';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

interface IHeroBlog {
  blog: BlogPostResponse;
}

export default function HeroBlog({ blog }: IHeroBlog) {
  if (!blog) return null;
  const { thumbnail, title, categories, publishedAt, readingTime, featured } = blog;
  //  make it
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <Image src={thumbnail} alt={title} fill className="object-cover" priority />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories and Tags */}
          <ScrollAnimation direction="down" delay={0.3} className="flex flex-wrap gap-2 mb-4">
            {categories?.map(({ _id, name }) => (
              <ScrollAnimation
                key={_id}
                direction="down"
                delay={0.4}
                className="px-3 py-1 bg-purple-600/80 text-white text-sm rounded-full backdrop-blur-sm">
                {name}
              </ScrollAnimation>
            ))}
          </ScrollAnimation>

          {/* Title */}
          <ScrollAnimation
            direction="down"
            delay={0.5}
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {title}
          </ScrollAnimation>

          {/* Meta Info */}
          <ScrollAnimation
            direction="down"
            delay={0.6}
            className="flex flex-wrap items-center gap-6 text-gray-200">
            <ScrollAnimation direction="down" delay={0.7} className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(publishedAt)}</span>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.8} className="flex items-center gap-2">
              <Clock size={16} />
              <span>{formatReadingTime(readingTime)}</span>
            </ScrollAnimation>
            {featured && (
              <ScrollAnimation
                direction="down"
                delay={0.9}
                className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded border border-yellow-500/30">
                FEATURED
              </ScrollAnimation>
            )}
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}

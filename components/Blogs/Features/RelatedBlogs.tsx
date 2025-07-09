import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { getImageUrl } from '@/sanity/lib/image';
import { formatReadingTime } from '@/utils/date';
import { IRelatedBlogs } from '@/utils/types/blog';
import Image from 'next/image';
import Link from 'next/link';


export default function RelatedBlogs({ relatedBlogs }: IRelatedBlogs) {
  if (!relatedBlogs || relatedBlogs.length === 0) return null;
  //  make it
  return (
    <ScrollAnimation
      direction="down"
      delay={0.2}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <ScrollAnimation direction="down" delay={0.3}>
        <h3 className="text-lg font-bold text-white mb-4">Related Posts</h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4} className="space-y-4">
        {relatedBlogs.slice(0, 3).map(({ _id, slug, thumbnail, title, readingTime }) => (
          <Link key={_id} href={`/blogs/${slug}`} className="block group">
            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={getImageUrl(thumbnail, 64, 64, 90)}
                  alt={title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{formatReadingTime(readingTime)}</p>
              </div>
            </div>
          </Link>
        ))}
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

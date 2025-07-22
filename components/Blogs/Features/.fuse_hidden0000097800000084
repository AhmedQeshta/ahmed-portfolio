import { BlogPostResponse, TechnologyResponse } from '@/sanity/lib/types';
import { formatDate } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';

interface LatestBlogsProps {
  latestBlogs: BlogPostResponse[];
}

export default function LatestBlogs({ latestBlogs }: LatestBlogsProps) {
  if (!latestBlogs || latestBlogs.length === 0) return null;
  //  make it
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Latest Posts</h3>
      <div className="space-y-4">
        {latestBlogs.slice(0, 3).map(({ _id, slug, thumbnail, title, publishedAt }) => (
          <Link key={_id} href={`/blogs/${slug}`} className="block group">
            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={thumbnail} alt={title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{formatDate(publishedAt)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/blogs"
        className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        View all posts →
      </Link>
    </div>
  );
}

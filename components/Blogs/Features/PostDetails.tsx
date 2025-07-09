import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { BlogPostResponse, TechnologyResponse } from '@/sanity/lib/types';
import { formatDate, formatReadingTime } from '@/utils/date';

interface IPostDetails {
  blog: BlogPostResponse;
}

export default function PostDetails({ blog }: IPostDetails) {
  if (!blog) return null;
  const { publishedAt, readingTime, categories, tags } = blog;
  //  make it
  return (
    <ScrollAnimation
      direction="down"
      delay={0.2}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <ScrollAnimation direction="down" delay={0.3}>
        <h3 className="text-lg font-bold text-white mb-4">Post Details</h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4}>
        <div className="space-y-3 text-sm">
          <ScrollAnimation direction="down" delay={0.5} className="flex justify-between">
            <span className="text-gray-400">Published:</span>
            <span className="font-medium text-gray-200">{formatDate(publishedAt)}</span>
          </ScrollAnimation>
          <ScrollAnimation direction="down" delay={0.6} className="flex justify-between">
            <span className="text-gray-400">Reading Time:</span>
            <span className="font-medium text-gray-200">{formatReadingTime(readingTime)}</span>
          </ScrollAnimation>
          {categories && (
            <ScrollAnimation direction="down" delay={0.7} className="flex justify-between">
              <span className="text-gray-400">Categories:</span>
              <span className="font-medium text-gray-200">{categories.length}</span>
            </ScrollAnimation>
          )}
          {tags && (
            <ScrollAnimation direction="down" delay={0.8} className="flex justify-between">
              <span className="text-gray-400">Tags:</span>
              <span className="font-medium text-gray-200">{tags.length}</span>
            </ScrollAnimation>
          )}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

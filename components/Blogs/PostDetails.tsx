import { BlogPostResponse, TechnologyResponse } from '@/sanity/lib/types';
import { formatDate, formatReadingTime } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';

interface PostDetailsProps {
  blog: BlogPostResponse;
}

export default function PostDetails({ blog }: PostDetailsProps) {
  if (!blog) return null;
  const { publishedAt, readingTime, categories, tags } = blog;
  //  make it
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Post Details</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Published:</span>
          <span className="font-medium text-gray-200">{formatDate(publishedAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Reading Time:</span>
          <span className="font-medium text-gray-200">{formatReadingTime(readingTime)}</span>
        </div>
        {categories && (
          <div className="flex justify-between">
            <span className="text-gray-400">Categories:</span>
            <span className="font-medium text-gray-200">{categories.length}</span>
          </div>
        )}
        {tags && (
          <div className="flex justify-between">
            <span className="text-gray-400">Tags:</span>
            <span className="font-medium text-gray-200">{tags.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}

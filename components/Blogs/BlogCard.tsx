import { getImageUrl } from '@/sanity/lib/image';
import { BlogPostResponse } from '@/sanity/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import Technologies from '@/components/ui/Technologies';

interface BlogCardProps {
  blogs: BlogPostResponse[];
}

export default async function BlogCard({ blogs }: BlogCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <Link
          href={`blogs/${blog.slug}`}
          key={blog._id}
          className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition">
          {blog.thumbnail ? (
            <Image
              src={getImageUrl(blog.thumbnail, 200, 140, 100)}
              alt={blog.title}
              width={200}
              height={140}
              className="object-cover w-full h-48"
              priority
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{blog.title.charAt(0)}</span>
            </div>
          )}

          <div className="p-4">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1 capitalize">
              {blog.title}
            </h3>

            {/* Technologies */}
            <Technologies technologies={blog.technologies} link={`/blogs/${blog.slug}`} />

            <div className="flex justify-between">
              {/* Duration */}
              <p className="text-text-secondary text-sm mb-4 font-medium flex items-center gap-2">
                <span className="text-text-secondary">🗓️</span>
                <span className="text-text-secondary px-1">{formatDate(blog.publishedAt)}</span>
              </p>

              {/* readingTime */}
              <p className="text-text-secondary text-sm mb-4 font-medium flex items-center gap-2">
                <span className="text-text-secondary">🕒</span>
                <span className="text-text-secondary px-1">{blog.readingTime} min read</span>
              </p>
            </div>

            {blog.description && (
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">{blog.description}</p>
            )}

            <div className="flex gap-4">
              <Link
                href={`blogs/${blog.slug}`}
                className="text-sm text-white/80 hover:text-white underline bg-gradient-to-br from-purple-500 to-pink-500 rounded-md px-2 py-2">
                See blog
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

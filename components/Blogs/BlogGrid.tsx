import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import Link from 'next/link';
import ErrorHandle from '@/components/ui/ErrorHandle';

interface BlogPost {
  id: string;
  title: string;
  html: string;
  description: string;
  tags: string[];
  category: string;
  thumbnail: string;
  slug: string;
}

interface BlogGridProps {
  blogs?: BlogPost[];
  readMore?: boolean;
}

export default async function BlogGrid({ readMore = true }: BlogGridProps) {
  try {
    const blogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
    });

    return (
      // add the tags as a badge and the category and do not add html
      <section id="blog" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">📝</span>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-sm text-white/80 hover:text-white underline">
                    Read Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {readMore && (
            <div className="flex justify-center mt-12">
              <Link
                href="/blogs"
                className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
                View All Blogs
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);

    return (
      <ErrorHandle
        id={'blog'}
        title={'Blogs'}
        description={'Failed to load Blogs. Please try again later.'}
      />
    );
  }
}

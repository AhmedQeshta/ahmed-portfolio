import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import Link from 'next/link';
import ErrorHandle from '@/components/ui/ErrorHandle';
import BlogCard from '@/components/Blogs/BlogCard';

interface BlogGridProps {
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

          {blogs.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No blogs found.</p>
            </div>
          ) : (
            <BlogCard blogs={blogs} />
          )}

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

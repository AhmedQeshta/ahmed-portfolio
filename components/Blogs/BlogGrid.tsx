import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import BlogCard from '@/components/Blogs/BlogCard';
import ReadMore from '@/components/ui/ReadMore';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

interface BlogGridProps {
  readMore?: boolean;
}

export default async function BlogGrid({ readMore = true }: BlogGridProps) {
  try {
    // if readMore true take first 6 blogs
    const blogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
    });

    return (
      // add the tags as a badge and the category and do not add html
      <section id="blog" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <ScrollAnimation direction="down" delay={0.1} className="mb-8">
            <h2 className="text-3xl font-semibold mb-8 gradient-text">Blogs</h2>
          </ScrollAnimation>

          {blogs.length === 0 ? (
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="text-center text-gray-400">
                <p>No blogs found.</p>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation
              direction="left"
              delay={0.3}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <ScrollAnimation key={blog._id} direction="right" delay={0.5}>
                  <BlogCard blog={blog} />
                </ScrollAnimation>
              ))}
            </ScrollAnimation>
          )}

          {readMore && <ReadMore link="/blogs" text="View All Blogs" />}
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

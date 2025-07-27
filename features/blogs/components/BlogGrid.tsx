import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import BlogCard from '@/features/blogs/components/BlogCard';
import ReadMore from '@/features/shard/components/ui/ReadMore';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBlogGrid } from '@/features/blogs/types/blog';

export default async function BlogGrid({ readMore = true, query }: IBlogGrid) {
  try {
    // Fetch all blogs
    let blogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
    });

    // Filter blogs based on search query if provided
    if (query && query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      blogs = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerQuery) ||
          blog.description.toLowerCase().includes(lowerQuery) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          blog.categories?.some((cat) => cat.name.toLowerCase().includes(lowerQuery)),
      );
    }

    return (
      <section id="blog" className="py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Blogs</h2>

          {blogs.length === 0 ? (
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="text-center text-gray-400">
                <p>No blogs found.</p>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation
              direction="left"
              delay={0.2}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <ScrollAnimation key={blog._id} direction="right" delay={0.3}>
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
      <ErrorHandle id={'blog'} description={'Failed to load Blogs. Please try again later.'} />
    );
  }
}

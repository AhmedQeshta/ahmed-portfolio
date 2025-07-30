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
      <section id="blogs" className="py-20">
        <ScrollAnimation
          direction="down"
          delay={0.1}
          className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-5">
          {/* Header Section */}
          <ScrollAnimation direction="down" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Blogs</h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Explore my latest thoughts, tutorials, and insights
              </p>
            </div>
          </ScrollAnimation>

          {/* Blogs Grid */}
          {blogs.length === 0 ? (
            <ScrollAnimation direction="down" delay={0.3}>
              <div className="text-center py-16">
                <div className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No blogs found</h3>
                  <p className="text-text-secondary">Check back soon for new articles!</p>
                </div>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation
              direction="up"
              delay={0.3}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <ScrollAnimation
                  key={blog._id}
                  direction="up"
                  delay={0.4 + index * 0.1}
                  className="h-full">
                  <BlogCard blog={blog} />
                </ScrollAnimation>
              ))}
            </ScrollAnimation>
          )}

          {/* Read More Section */}
          {readMore && blogs.length > 0 && (
            <ScrollAnimation direction="up" delay={0.6}>
              <div className="text-center mt-12">
                <ReadMore link="/blogs" text="View All Blogs" />
              </div>
            </ScrollAnimation>
          )}
        </ScrollAnimation>
      </section>
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);

    return (
      <ErrorHandle id={'blogs'} description={'Failed to load Blogs. Please try again later.'} />
    );
  }
}

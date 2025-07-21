import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import BlogCard from '@/components/Blogs/BlogCard';
import ReadMore from '@/components/ui/ReadMore';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { IBlogGrid } from '@/utils/types/blog';

export default async function BlogGrid({ readMore = true, query }: IBlogGrid) {
  try {
    // if readMore true take first 6 blogs
    let blogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
    });

    if (query) {
      blogs = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.description.toLowerCase().includes(query.toLowerCase()) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          blog.categories?.some((cat) => cat.name.toLowerCase().includes(query.toLowerCase())),
      );
    }

    return (
      // add the tags as a badge and the category and do not add html
      <section id="blog" className="py-10">
        <div className="mx-auto max-w-7xl px-4">
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
      <ErrorHandle
        id={'blog'}
        title={'Blogs'}
        description={'Failed to load Blogs. Please try again later.'}
      />
    );
  }
}

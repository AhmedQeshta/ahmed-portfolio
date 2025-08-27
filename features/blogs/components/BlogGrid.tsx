import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import BlogCard from '@/features/blogs/components/BlogCard';
import Search from '@/features/filters/components/Search';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBlogGrid } from '@/features/blogs/types/blog';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';

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
      <section id="blogs" className={`py-10 ${!readMore && 'mt-20 lg:mt-20'}`}>
        <ScrollAnimation
          direction="down"
          delay={0.1}
          className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5">
          <HeaderTitle
            title="Blogs"
            subtitle="Explore my latest thoughts, tutorials, and insights"
            className={`${!readMore ? 'mb-0 lg:mb-0' : 'mb-10 lg:mb-10'}`}
          />

          {!readMore && <Search action="/blogs" placeholder="Search blogs..." />}
          {/* Blogs Grid */}
          {blogs.length === 0 ? (
            <EmptyItem
              title="No blogs found"
              subTitle="Check back soon for new articles!"
              icon="📝"
            />
          ) : (
            <BlogCard blogs={blogs} readMore={readMore} />
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

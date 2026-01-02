import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery, categoriesQuery, pageViewsBySlugsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, CategoryResponse, PageViewResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import BlogCard from '@/features/blogs/components/BlogCard';
import Search from '@/features/filters/components/Search';
import { IBlogGrid } from '@/features/blogs/types/blog';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';

export default async function BlogGrid({ readMore = true, query }: IBlogGrid) {
  try {
    let [blogs, categories] = await Promise.all([
      sanityFetch<BlogPostResponse[]>({
        query: blogPostsQuery,
        tags: ['blogPosts'],
      }),
      sanityFetch<CategoryResponse[]>({
        query: categoriesQuery,
        tags: ['categories'],
      }),
    ]);

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

    // Fetch view counts for all blogs (no cache for real-time updates)
    const slugs = blogs.map((blog) => blog.slug);
    const pageViews =
      slugs.length > 0
        ? await sanityFetch<PageViewResponse[]>({
            query: pageViewsBySlugsQuery,
            params: { slugs },
            tags: ['pageViews'],
            cache: false,
            revalidate: 0,
          })
        : [];

    // Debug: Log fetched pageViews
    if (process.env.NODE_ENV === 'development') {
      console.log('[BlogGrid] Fetched pageViews:', pageViews);
      console.log('[BlogGrid] Blog slugs:', slugs);
    }

    // Create a map of slug to view count for quick lookup
    const viewCountMap = new Map(pageViews.map((pv) => [pv.slug, pv.count]));

    // Merge view counts with blogs
    const blogsWithViews = blogs.map((blog) => {
      const viewCount = viewCountMap.get(blog.slug);
      if (process.env.NODE_ENV === 'development') {
        console.log(`[BlogGrid] Blog "${blog.slug}": viewCount =`, viewCount);
      }
      return {
        ...blog,
        viewCount: viewCount !== undefined ? viewCount : undefined,
      };
    });

    return (
      <section id="blogs" className={`py-10 ${!readMore && 'mt-20 lg:mt-20'}`}>
        <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5">
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
            <BlogCard blogs={blogsWithViews} readMore={readMore} categories={categories} />
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);

    return (
      <ErrorHandle id={'blogs'} description={'Failed to load Blogs. Please try again later.'} />
    );
  }
}

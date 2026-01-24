import Blog from '@/features/blogs/components/Blog';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { blogPostBySlugQuery, blogPostsQuery, pageViewBySlugQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, PageViewResponse } from '@/sanity/lib/types';
import { FixedPageProps } from '@/types/app-router';

import { generateBlogMetadata } from '@/features/blogs/utils/metaData';

export { generateBlogMetadata as generateMetadata };

// Enable ISR
export const revalidate = 300;

// Use our fixed type to avoid the "not satisfying PageProps" error
export default async function blogDetailPage(props: FixedPageProps) {
  const { slug } = await props.params;

  try {
    const [blog, latestBlogs, pageView] = await Promise.all([
      sanityFetch<BlogPostResponse>({
        query: blogPostBySlugQuery,
        params: { slug },
        tags: ['sanity', 'blogs', `blog:${slug}`],
      }),
      sanityFetch<BlogPostResponse[]>({
        query: blogPostsQuery,
        tags: ['sanity', 'blogs'],
        params: {
          limit: 3,
          order: 'desc',
          orderBy: 'publishedAt',
        },
      }),
      sanityFetch<PageViewResponse | null>({
        query: pageViewBySlugQuery,
        params: { slug },
        tags: ['sanity', 'pageViews', `pageView:${slug}`],
        revalidate: 0, // Keep page views dynamic for now if possible, or short cache
      }),
    ]);

    const relatedBlogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['sanity', 'blogs'],
      params: {
        limit: 3,
        order: 'desc',
        orderBy: 'publishedAt',
        exclude: [blog._id],
      },
    });

    const viewCount = pageView?.count || 0;

    return (
      <Blog
        blog={blog}
        latestBlogs={latestBlogs}
        relatedBlogs={relatedBlogs}
        viewCount={viewCount}
      />
    );
  } catch {
    return (
      <ErrorHandle id={'blog'} description={'Failed to load blog post. Please try again later.'} />
    );
  }
}

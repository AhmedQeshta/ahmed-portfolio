import Blog from '@/features/blogs/components/Blog';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery, pageViewBySlugQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, PageViewResponse } from '@/sanity/lib/types';
import { FixedPageProps } from '@/types/app-router';

import { generateBlogMetadata } from '@/features/blogs/utils/metaData';

export { generateBlogMetadata as generateMetadata };

// Force dynamic rendering for faster updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Use our fixed type to avoid the "not satisfying PageProps" error
export default async function blogDetailPage(props: FixedPageProps) {
  const { slug } = await props.params;

  try {
    const [blog, latestBlogs, pageView] = await Promise.all([
      sanityFetch<BlogPostResponse>({
        query: blogPostBySlugQuery,
        params: { slug },
        tags: ['blogPost'],
      }),
      sanityFetch<BlogPostResponse[]>({
        query: blogPostsQuery,
        tags: ['latestBlogs'],
        params: {
          limit: 3,
          order: 'desc',
          orderBy: 'publishedAt',
        },
      }),
      sanityFetch<PageViewResponse | null>({
        query: pageViewBySlugQuery,
        params: { slug },
        tags: ['pageViews'],
        cache: false,
        revalidate: 0,
      }),
    ]);

    const relatedBlogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['relatedBlogs'],
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

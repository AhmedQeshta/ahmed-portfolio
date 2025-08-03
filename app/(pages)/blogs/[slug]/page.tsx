import Blog from '@/features/blogs/components/Blog';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery, featuresQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, FeatureResponse } from '@/sanity/lib/types';
import { FixedPageProps } from '@/types/app-router';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';

import { generateBlogMetadata, generateBlogStaticParams } from '@/features/blogs/utils/metaData';

export {
  generateBlogMetadata as generateMetadata,
  generateBlogStaticParams as generateStaticParams,
};
// Use our fixed type to avoid the "not satisfying PageProps" error
export default async function Page(props: FixedPageProps) {
  const { slug } = await props.params;

  try {
    const blog = await sanityFetch<BlogPostResponse>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ['blogPost'],
    });
    const latestBlogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
      params: {
        limit: 3,
        order: 'desc',
        orderBy: 'publishedAt',
      },
    });

    const relatedBlogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
      params: {
        limit: 3,
        order: 'desc',
        orderBy: 'publishedAt',
        exclude: [blog._id],
      },
    });

    return <Blog blog={blog} latestBlogs={latestBlogs} relatedBlogs={relatedBlogs} />;
  } catch (error) {
    return (
      <ErrorHandle id={'blog'} description={'Failed to load blog post. Please try again later.'} />
    );
  }
}

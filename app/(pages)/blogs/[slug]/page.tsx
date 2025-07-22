import Blog from '@/features/blogs/components/Blog';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import { IBlogPage } from '@/features/blogs/types/blog';
import React from 'react';

export { generateBlogMetadata as generateMetadata } from '@/features/blogs/utils/generateBlogMetadata';

const BlogPage = async ({ params }: IBlogPage) => {
  const { slug } = await params;

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
      <ErrorHandle
        id={'projects'}
        title={'WProjects'}
        description={'Failed to load projects. Please try again later.'}
      />
    );
  }
};

export default BlogPage;

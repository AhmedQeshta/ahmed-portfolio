import Blog from '@/components/Blogs/Blog';
import ErrorHandle from '@/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import React from 'react';

interface BlogPageInterface {
  params: Promise<{ slug: string }>;
}

const BlogPage = async ({ params }: BlogPageInterface) => {
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

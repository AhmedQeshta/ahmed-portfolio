import Blog from '@/components/Blogs/Blog';
import ErrorHandle from '@/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery } from '@/sanity/lib/queries';
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
      tags: ['blogPosts'],
    });

    return <Blog blog={blog} />;
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

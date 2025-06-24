import Blog from '@/components/Blogs/Blog';
import ErrorHandle from '@/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await sanityFetch<BlogPostResponse>({
    query: blogPostBySlugQuery,
    params: { slug: params.slug },
    tags: ['blogPost'],
  });
  if (!blog) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/blogs/${blog.slug}`;
  const title = blog.seo?.metaTitle || blog.title;
  const description = blog.seo?.metaDescription || blog.description;
  const image = blog.thumbnail;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: image ? [image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

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

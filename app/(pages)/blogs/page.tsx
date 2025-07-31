import BlogGrid from '@/features/blogs/components/BlogGrid';
import Search from '@/features/blogs/components/ui/Search';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import { notFound } from 'next/navigation';
import React from 'react';
import { Metadata } from 'next';

// Mark this page as dynamic
export const dynamic = 'force-dynamic';

// Metadata for the blogs listing page
export const metadata: Metadata = {
  title: 'Blog - Ahmed Qeshta',
  description:
    'Explore insights, tutorials, and thoughts on software development, technology, and programming by Ahmed Qeshta.',
  keywords: 'blog, software development, programming, technology, tutorials, Ahmed Qeshta',
  openGraph: {
    title: 'Blog - Ahmed Qeshta',
    description:
      'Explore insights, tutorials, and thoughts on software development, technology, and programming by Ahmed Qeshta.',
    type: 'website',
    images: ['/images/ahmed-qeshta-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Ahmed Qeshta',
    description:
      'Explore insights, tutorials, and thoughts on software development, technology, and programming by Ahmed Qeshta.',
    images: ['/images/ahmed-qeshta-og.png'],
    creator: '@ahmedqeshta',
  },
};

const BlogPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });

    const blogFeature = features.filter(
      (_, { name, status }: any) => name === 'blogs' && status === 'publish',
    );

    if (!blogFeature) notFound();

    // Correctly use the search params in an async context
    const query = searchParams?.q || '';

    return (
      <>
        <Search action="/blogs" />
        <BlogGrid readMore={false} query={query} />
      </>
    );
  } catch (error) {
    return (
      <ErrorHandle
        id={'blog-page'}
        description={'Failed to load Blog Page. Please try again later.'}
      />
    );
  }
};

export default BlogPage;

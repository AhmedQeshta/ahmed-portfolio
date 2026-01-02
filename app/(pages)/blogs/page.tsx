import BlogGrid from '@/features/blogs/components/BlogGrid';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BlogGridSkeleton from '@/features/blogs/components/BlogGridSkeleton';

// Mark this page as dynamic for real-time view updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BlogPage = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });

    const blogFeature = features.filter(
      (feature) => feature.name === 'blogs' && feature.status === 'publish',
    );

    if (!blogFeature) notFound();

    // Correctly use the search params in an async context
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.q || '';

    return (
      <Suspense fallback={<BlogGridSkeleton readMore={false} />}>
        <BlogGrid readMore={false} query={query} />
      </Suspense>
    );
  } catch {
    return (
      <ErrorHandle
        id={'blog-page'}
        description={'Failed to load Blog Page. Please try again later.'}
      />
    );
  }
};

export default BlogPage;

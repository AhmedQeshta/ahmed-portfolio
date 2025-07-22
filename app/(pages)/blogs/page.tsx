import BlogGrid from '@/features/blogs/components/BlogGrid';
import Search from '@/features/blogs/components/ui/Search';
import React from 'react';

// Mark this page as dynamic
export const dynamic = 'force-dynamic';

const BlogPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
  // Correctly use the search params in an async context
  const query = searchParams?.q || '';

  return (
    <>
      <Search action="/blogs" />
      <BlogGrid readMore={false} query={query} />
    </>
  );
};

export default BlogPage;

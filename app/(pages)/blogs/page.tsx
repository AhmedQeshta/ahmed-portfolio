import BlogGrid from '@/components/Blogs/BlogGrid';
import Search from '@/components/ui/Search';
import { IBlogsPage } from '@/utils/types/blog';
import React from 'react';

// Mark this page as dynamic
export const dynamic = 'force-dynamic';

const BlogPage = ({ searchParams }: { searchParams: { q?: string } }) => {
  const query = searchParams?.q ?? '';
  return (
    <>
      <Search action="/blogs" />
      <BlogGrid readMore={false} query={query} />
    </>
  );
};

export default BlogPage;

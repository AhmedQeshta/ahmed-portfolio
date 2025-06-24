import BlogGrid from '@/components/Blogs/BlogGrid';
import Search from '@/components/Search';
import React from 'react';

interface BlogPageProps {
  searchParams?: Promise<{ q?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const query = (await searchParams)?.q ?? '';
  return (
    <>
      <Search action="/blogs" />
      <BlogGrid readMore={false} query={query} />
    </>
  );
};

export default BlogPage;

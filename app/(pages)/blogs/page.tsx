import BlogGrid from '@/components/Blogs/BlogGrid';
import Search from '@/components/ui/Search';
import React from 'react';

interface IBlogPage {
  searchParams?: Promise<{ q?: string }>;
}

const BlogPage = async ({ searchParams }: IBlogPage) => {
  const query = (await searchParams)?.q ?? '';
  return (
    <>
      <Search action="/blogs" />
      <BlogGrid readMore={false} query={query} />
    </>
  );
};

export default BlogPage;

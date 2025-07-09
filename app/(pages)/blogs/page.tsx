import BlogGrid from '@/components/Blogs/BlogGrid';
import Search from '@/components/ui/Search';
import { IBlogsPage } from '@/utils/types/blog';
import React from 'react';

const BlogPage = async ({ searchParams }: IBlogsPage) => {
  const query = (await searchParams)?.q ?? '';
  return (
    <>
      <Search action="/blogs" />
      <BlogGrid readMore={false} query={query} />
    </>
  );
};

export default BlogPage;

import BlogGrid from '@/components/BlogGrid';
import Search from '@/components/Search';
import React from 'react';

const BlogPage = () => {
  // add search and use query like  this "example.com?q=text"
  return (
    <>
      <Search action="/blogs" />
      <BlogGrid blogs={[]} readMore={false} />
    </>
  );
};

export default BlogPage;

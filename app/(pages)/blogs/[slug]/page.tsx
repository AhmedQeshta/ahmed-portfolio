import React from 'react';

interface BlogPageInterface {
  params: Promise<{ slug: string }>;
}

const BlogPage = async ({ params }: BlogPageInterface) => {
  const { slug } = await params;
  /*
    display all content on this page (id, title, tags, category, html, description, thumbnail)
   */
  return <div>div first time run : {slug}</div>;
};

export default BlogPage;

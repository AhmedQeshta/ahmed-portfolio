import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';

// export generateMetadata for single blog
export async function generateBlogMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await sanityFetch<BlogPostResponse>({
    query: blogPostBySlugQuery,
    params: { slug },
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
      creator: '@ahmedqeshta',
    },
  };
}

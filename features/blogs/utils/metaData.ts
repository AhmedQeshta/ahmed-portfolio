import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery, featuresQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, FeatureResponse } from '@/sanity/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Metadata generation function
export async function generateBlogMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });
    const blogFeature = features.filter(
      (_, { name, status }: any) => name === 'blogs' && status === 'publish',
    );

    if (!blogFeature) notFound();

    const blog = await sanityFetch<BlogPostResponse>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ['blogPost'],
    });

    if (!blog) return {};

    const siteUrl = process.env.SITE_URL || 'https://ahmedqeshta.vercel.app';
    const url = `${siteUrl}/blogs/${blog.slug}`;
    const title = blog.seo?.metaTitle || `${blog.title} - Ahmed Qeshta`;
    const description =
      blog.seo?.metaDescription ||
      blog.description ||
      'Read this insightful blog post by Ahmed Qeshta, Software Engineer.';

    // Use blog thumbnail if available, otherwise fallback to default OG image
    const defaultOgImage = `${siteUrl}/images/ahmed-qeshta-og.png`;
    const blogImage = blog.thumbnail
      ? blog.thumbnail.startsWith('http')
        ? blog.thumbnail
        : `${siteUrl}${blog.thumbnail}`
      : defaultOgImage;

    // Add category names to keywords
    const categoryNames = blog.categories?.map((cat) => cat.name) || [];
    const keywords = [...(blog.tags || []), ...categoryNames].join(', ');

    return {
      title,
      description,
      keywords,
      alternates: { canonical: url },
      authors: [{ name: 'Ahmed Qeshta', url: siteUrl }],
      creator: 'Ahmed Qeshta',
      publisher: 'Ahmed Qeshta',
      other: {
        'article:author': 'Ahmed Qeshta',
        'article:published_time': blog.publishedAt || new Date().toISOString(),
        'article:modified_time': blog.publishedAt || new Date().toISOString(),
        'article:tag': categoryNames.join(', '),
        'article:section': categoryNames[0] || 'Technology',
      },
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        siteName: 'Ahmed Qeshta - Portfolio',
        images: [
          {
            url: blogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        tags: [...(blog.tags || []), ...categoryNames],
        publishedTime: blog.publishedAt,
        modifiedTime: blog.publishedAt,
        authors: ['Ahmed Qeshta'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [blogImage],
        creator: '@ahmedqeshta',
        site: '@ahmedqeshta',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': 160,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

// Generate static params for all blog routes at build time
export async function generateBlogStaticParams() {
  try {
    const blogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
    });

    return blogs.map(({ slug }) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [];
  }
}

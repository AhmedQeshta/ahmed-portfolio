import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery } from '@/sanity/lib/queries';
import { BlogPostResponse } from '@/sanity/lib/types';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Ahmed Qeshta - Software Engineer',
  description: 'Ahmed Qeshta - Software Engineer',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer',
    images: ['images/ahmed-qeshta-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer',
    images: ['images/ahmed-qeshta-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || '',
  },
  manifest: '/manifest.json',
  creator: 'Ahmed Qeshta',
  publisher: 'Ahmed Qeshta',
  authors: [
    {
      name: 'Ahmed Qeshta',
      url: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    },
  ],
  applicationName: 'Ahmed Qeshta - Software Engineer',
  appleWebApp: {
    title: 'Ahmed Qeshta - Software Engineer',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
  colorScheme: 'dark',
};

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
    },
  };
}

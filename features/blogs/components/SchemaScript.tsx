import { BlogPostResponse } from '@/sanity/lib/types';
import { siteUrl } from '@/features/shard/utils/url';

export default function SchemaScript({ blog }: { blog: BlogPostResponse }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    image: blog.thumbnail
      ? blog.thumbnail.startsWith('http')
        ? blog.thumbnail
        : `${siteUrl}${blog.thumbnail}`
      : `${siteUrl}/images/ahmed-qeshta-og.png`,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt, // Or a separate modified date field if you have one
    author: {
      '@type': 'Person',
      name: 'Ahmed Qeshta',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ahmed Qeshta',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`, // Make sure this exists, or use a generic one
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blogs/${blog.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

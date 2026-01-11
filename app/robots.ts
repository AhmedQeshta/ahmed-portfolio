import { MetadataRoute } from 'next';
import { siteUrl } from '@/features/shard/utils/url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/offline/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}


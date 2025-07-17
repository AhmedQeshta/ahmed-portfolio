import { metadata, viewport, generateBlogMetadata } from '@/utils/metaData';
import { sanityFetch } from '@/sanity/lib/client';

// Mock sanityFetch
jest.mock('@/sanity/lib/client', () => ({
  sanityFetch: jest.fn(),
}));

describe('metaData utilities', () => {
  describe('metadata', () => {
    it('should have correct base structure', () => {
      expect(metadata).toHaveProperty('title');
      expect(metadata).toHaveProperty('description');
      expect(metadata).toHaveProperty('icons');
      expect(metadata).toHaveProperty('openGraph');
      expect(metadata).toHaveProperty('twitter');
      expect(metadata).toHaveProperty('robots');
      expect(metadata).toHaveProperty('alternates');
      expect(metadata).toHaveProperty('manifest');
      expect(metadata).toHaveProperty('creator');
      expect(metadata).toHaveProperty('publisher');
      expect(metadata).toHaveProperty('authors');
      expect(metadata).toHaveProperty('applicationName');
      expect(metadata).toHaveProperty('appleWebApp');
      expect(metadata).toHaveProperty('formatDetection');
    });

    it('should have the correct title and description', () => {
      expect(metadata.title).toBe('Ahmed Qeshta - Software Engineer');
      expect(metadata.description).toBe('Ahmed Qeshta - Software Engineer');
    });

    it('should have proper OpenGraph configuration', () => {
      expect(metadata.openGraph).toHaveProperty('title');
      expect(metadata.openGraph).toHaveProperty('description');
      expect(metadata.openGraph).toHaveProperty('images');
    });

    it('should have proper Twitter configuration', () => {
      expect(metadata.twitter).toHaveProperty('creator');
      expect(metadata.twitter).toHaveProperty('title');
      expect(metadata.twitter).toHaveProperty('description');
      expect(metadata.twitter).toHaveProperty('images');
      expect(metadata.twitter).toHaveProperty('card');
    });

    it('should have proper authors configuration', () => {
      expect(metadata.authors).toBeInstanceOf(Array);
      expect(Array.isArray(metadata.authors)).toBe(true);
      if (Array.isArray(metadata.authors)) {
        expect(metadata.authors[0]).toHaveProperty('name');
        expect(metadata.authors[0]).toHaveProperty('url');
        expect(metadata.authors[0].name).toBe('Ahmed Qeshta');
      }
    });
  });

  describe('viewport', () => {
    it('should have correct structure', () => {
      expect(viewport).toHaveProperty('width');
      expect(viewport).toHaveProperty('initialScale');
      expect(viewport).toHaveProperty('maximumScale');
      expect(viewport).toHaveProperty('themeColor');
      expect(viewport).toHaveProperty('colorScheme');
    });

    it('should have proper values', () => {
      expect(viewport.width).toBe('device-width');
      expect(viewport.initialScale).toBe(1);
      expect(viewport.maximumScale).toBe(5);
      expect(viewport.themeColor).toBe('#000000');
      expect(viewport.colorScheme).toBe('dark');
    });
  });

  describe('generateBlogMetadata', () => {
    beforeEach(() => {
      // Reset mock
      jest.clearAllMocks();
    });

    it('should return empty object if blog not found', async () => {
      // Mock a case where blog is not found
      (sanityFetch as jest.Mock).mockResolvedValue(null);

      const result = await generateBlogMetadata({ params: Promise.resolve({ slug: 'not-found' }) });
      expect(result).toEqual({});
      expect(sanityFetch).toHaveBeenCalledTimes(1);
    });

    it('should generate correct metadata for a blog post with SEO fields', async () => {
      // Mock blog data with SEO fields
      const mockBlog = {
        slug: 'test-blog',
        title: 'Original Title',
        description: 'Original Description',
        thumbnail: 'https://example.com/image.jpg',
        seo: {
          metaTitle: 'SEO Title',
          metaDescription: 'SEO Description',
        },
      };

      (sanityFetch as jest.Mock).mockResolvedValue(mockBlog);

      const result = await generateBlogMetadata({ params: Promise.resolve({ slug: 'test-blog' }) });

      expect(result).toHaveProperty('title', 'SEO Title');
      expect(result).toHaveProperty('description', 'SEO Description');
      expect(result).toHaveProperty('openGraph');
      expect(result).toHaveProperty('twitter');
      expect(result.openGraph).toHaveProperty('title', 'SEO Title');
      expect(result.openGraph).toHaveProperty('description', 'SEO Description');
      expect(result.openGraph).toHaveProperty('images', ['https://example.com/image.jpg']);
      expect(result.twitter).toHaveProperty('card', 'summary_large_image');
    });

    it('should use default title/description when SEO fields are not provided', async () => {
      // Mock blog data without SEO fields
      const mockBlog = {
        slug: 'test-blog',
        title: 'Original Title',
        description: 'Original Description',
        thumbnail: 'https://example.com/image.jpg',
      };

      (sanityFetch as jest.Mock).mockResolvedValue(mockBlog);

      const result = await generateBlogMetadata({ params: Promise.resolve({ slug: 'test-blog' }) });

      expect(result).toHaveProperty('title', 'Original Title');
      expect(result).toHaveProperty('description', 'Original Description');
    });
  });
});

import { convertToEmbedUrl } from '@/features/shard/utils/embed';

describe('embed utilities', () => {
  describe('convertToEmbedUrl function', () => {
    it('should convert YouTube watch URL to embed URL', () => {
      const watchUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const result = convertToEmbedUrl(watchUrl);
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    it('should convert YouTube short URL to embed URL', () => {
      const shortUrl = 'https://youtu.be/dQw4w9WgXcQ';
      const result = convertToEmbedUrl(shortUrl);
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    it('should convert YouTube watch URL with additional parameters to embed URL', () => {
      const watchUrlWithParams = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s&feature=share';
      const result = convertToEmbedUrl(watchUrlWithParams);
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    it('should return embed URL unchanged if already an embed URL', () => {
      const embedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      const result = convertToEmbedUrl(embedUrl);
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    it('should return other iframe URLs unchanged', () => {
      const otherUrl = 'https://example.com/embed/video';
      const result = convertToEmbedUrl(otherUrl);
      expect(result).toBe('https://example.com/embed/video');
    });

    it('should return empty string if URL is empty', () => {
      const emptyUrl = '';
      const result = convertToEmbedUrl(emptyUrl);
      expect(result).toBe('');
    });

    it('should handle YouTube URLs with www prefix', () => {
      const wwwUrl = 'https://www.youtube.com/watch?v=VIDEO_ID_123';
      const result = convertToEmbedUrl(wwwUrl);
      expect(result).toBe('https://www.youtube.com/embed/VIDEO_ID_123');
    });

    it('should handle YouTube URLs without www prefix', () => {
      const noWwwUrl = 'https://youtube.com/watch?v=VIDEO_ID_123';
      const result = convertToEmbedUrl(noWwwUrl);
      expect(result).toBe('https://www.youtube.com/embed/VIDEO_ID_123');
    });
  });
});


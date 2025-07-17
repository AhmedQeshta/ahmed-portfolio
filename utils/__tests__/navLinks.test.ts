import { linksApp, linksPages, mediaList } from '../navLinks';

describe('navLinks utilities', () => {
  describe('linksApp', () => {
    it('should contain the correct navigation links', () => {
      expect(linksApp).toHaveLength(5);

      // Check for specific links
      expect(linksApp).toContainEqual(
        expect.objectContaining({
          id: 1,
          name: 'Home',
          url: '#home',
        }),
      );

      expect(linksApp).toContainEqual(
        expect.objectContaining({
          id: 3,
          name: 'Projects',
          url: '#projects',
        }),
      );

      // Check structure of each link
      linksApp.forEach((link) => {
        expect(link).toHaveProperty('id');
        expect(link).toHaveProperty('name');
        expect(link).toHaveProperty('url');
        expect(typeof link.id).toBe('number');
        expect(typeof link.name).toBe('string');
        expect(typeof link.url).toBe('string');
      });
    });
  });

  describe('linksPages', () => {
    it('should contain the correct page links', () => {
      expect(linksPages).toHaveLength(5);

      // Check for specific links
      expect(linksPages).toContainEqual(
        expect.objectContaining({
          id: 1,
          name: 'Home',
          url: '/#home',
        }),
      );

      expect(linksPages).toContainEqual(
        expect.objectContaining({
          id: 2,
          name: 'Works',
          url: '/#work',
        }),
      );

      // Check structure of each link
      linksPages.forEach((link) => {
        expect(link).toHaveProperty('id');
        expect(link).toHaveProperty('name');
        expect(link).toHaveProperty('url');
        expect(typeof link.id).toBe('number');
        expect(typeof link.name).toBe('string');
        expect(typeof link.url).toBe('string');
        expect(link.url.startsWith('/')).toBe(true);
      });
    });
  });

  describe('mediaList', () => {
    it('should contain social media links', () => {
      expect(mediaList.length).toBeGreaterThan(0);

      // Check GitHub entry
      const github = mediaList.find((item) => item.title === 'GitHub');
      expect(github).toBeDefined();
      expect(github?.href).toBe('https://github.com/AhmedQeshta');
      expect(github?.rel).toBe('noopener noreferrer');
      expect(github?.target).toBe('_blank');

      // Check LinkedIn entry
      const linkedin = mediaList.find((item) => item.title === 'LinkedIn');
      expect(linkedin).toBeDefined();
      expect(linkedin?.href).toBe('https://www.linkedin.com/in/ahmedqeshta/');

      // Check structure of each media item
      mediaList.forEach((item) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('href');
        expect(item).toHaveProperty('rel');
        expect(item).toHaveProperty('target');
        expect(typeof item.title).toBe('string');
        expect(typeof item.href).toBe('string');
        expect(item.href).toMatch(/^https?:\/\//); // URLs should start with http:// or https://
      });
    });
  });
});

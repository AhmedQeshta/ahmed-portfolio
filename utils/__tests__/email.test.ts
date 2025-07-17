import { getHtml, getText } from '@/utils/email';

describe('email utilities', () => {
  const mockContactData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message.',
  };

  describe('getHtml function', () => {
    it('should generate HTML email content with provided data', () => {
      const html = getHtml(mockContactData);

      // Check if HTML contains key elements
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html>');
      expect(html).toContain('</html>');

      // Check if user data is included
      expect(html).toContain(mockContactData.name);
      expect(html).toContain(mockContactData.email);
      expect(html).toContain(mockContactData.message);

      // Check for email structure elements
      expect(html).toContain('New Contact Form Submission');
      expect(html).toContain('<span class="label">From:</span>');
      expect(html).toContain('<span class="label">Email:</span>');
      expect(html).toContain('<span class="label">Message:</span>');
    });
  });

  describe('getText function', () => {
    it('should generate plain text email content with provided data', () => {
      const text = getText(mockContactData);
      // Check if text contains necessary content
      expect(text).toContain('New Contact Form Submission');
      // Check if user data is included
      expect(text).toContain(`From: ${mockContactData.name}`);
      expect(text).toContain(`Email: ${mockContactData.email}`);
      // Check for message label and content, ignoring whitespace
      expect(text.replace(/\s+/g, ' ')).toContain(`Message: ${mockContactData.message}`);
      // Should be plain text (no HTML tags)
      expect(text).not.toContain('<');
      expect(text).not.toContain('>');
      expect(text).not.toContain('</');
    });
  });
});

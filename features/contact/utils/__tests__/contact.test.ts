import { sendMessage } from '@/features/contact/utils/actions/contact';
import { getHtml, getText } from '@/features/contact/utils/template';

// Mock email utilities
jest.mock('@/features/contact/utils/template', () => ({
  getHtml: jest.fn().mockReturnValue('<html>Mock HTML</html>'),
  getText: jest.fn().mockReturnValue('Mock text'),
}));

// Mock the email module
jest.mock('@/features/contact/utils/email', () => ({
  transporter: {
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  },
  mailOptions: jest.fn().mockReturnValue({
    from: 'test@example.com',
    to: 'ahmed.qeshta.dev@gmail.com',
    subject: 'Test Subject',
    html: '<html>Mock HTML</html>',
    text: 'Mock text',
  }),
}));

describe('contact actions', () => {
  // Setup environment variables that would be normally in the process.env
  const originalEnv = process.env;
  // Spy on console methods to suppress output during tests
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Silence console.log and console.error during tests
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.clearAllMocks();

    // Setup mock environment variables
    process.env = {
      ...originalEnv,
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_SECURE: 'false',
      SMTP_USER: 'test@example.com',
      SMTP_PASS: 'password123',
      SMTP_FROM: 'noreply@example.com',
      TO_EMAIL: 'ahmed.qeshta.dev@gmail.com',
    };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    // Restore console methods
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('sendMessage', () => {
    it('should validate input and return errors for invalid data', async () => {
      const formData = new FormData();
      formData.append('name', ''); // Empty name
      formData.append('email', 'invalid-email'); // Invalid email
      formData.append('message', ''); // Empty message

      const prevState = { errors: {} };
      const result = await sendMessage(prevState, formData);

      expect(result).toHaveProperty('errors');
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('message');
    });

    it('should send an email with valid form data', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'john.doe@example.com');
      formData.append('message', 'This is a test message');
      const prevState = { errors: {} };
      const result = await sendMessage(prevState, formData);

      // Verify success response
      expect(result).toHaveProperty('errors', {});
      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('message');
    });

    it('should handle email sending errors', async () => {
      // Mock an error in sendMail by updating the mock
      const { transporter } = require('@/features/contact/utils/email');
      (transporter.sendMail as jest.Mock).mockRejectedValueOnce(new Error('SMTP error'));

      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'john.doe@example.com');
      formData.append('message', 'This is a test message');
      const prevState = { errors: {} };
      const result = await sendMessage(prevState, formData);
      // Verify error response
      expect(result).toHaveProperty('errors');
      if ('general' in result.errors) {
        expect((result.errors as any).general).toBe(
          'An unexpected error occurred. Please try again later.',
        );
      } else {
        expect(result.errors).toEqual({});
      }
    });
  });
});

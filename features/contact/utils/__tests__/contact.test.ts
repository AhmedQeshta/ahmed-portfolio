jest.mock('nodemailer');
import nodemailer from 'nodemailer';
import { sendMessage } from '@/features/contact/utils/actions/contact';
import { getHtml, getText } from '@/features/contact/utils/email';

// Mock email utilities
jest.mock('@/features/contact/utils/email', () => ({
  getHtml: jest.fn().mockReturnValue('<html>Mock HTML</html>'),
  getText: jest.fn().mockReturnValue('Mock text'),
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
    (nodemailer.createTransport as unknown as jest.Mock).mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
    });

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
      // Verify nodemailer was called correctly
      expect(nodemailer.createTransport).toHaveBeenCalled();
      const transport = (nodemailer.createTransport as jest.Mock).mock.results[0].value;
      expect(transport.sendMail).toHaveBeenCalled();
      // Verify email utilities were called
      expect(getHtml).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a test message',
      });
      expect(getText).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a test message',
      });
      // Verify success response
      expect(result).toHaveProperty('errors', {});
      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('message');
    });

    it('should handle email sending errors', async () => {
      // Mock an error in sendMail
      (nodemailer.createTransport as unknown as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockRejectedValueOnce(new Error('SMTP error')),
      });
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

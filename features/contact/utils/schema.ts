import z from 'zod';

// Zod schema for contact form validation
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').trim(),
  message: z.string().min(1, 'Message is required').trim(),
  newsletter: z.boolean().default(true),
});

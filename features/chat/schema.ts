import z from 'zod';

// Zod schema for chat form validation
export const chatSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(150, 'The message must be less that 150')
    .trim(),
});

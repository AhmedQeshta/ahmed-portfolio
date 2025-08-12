import z from 'zod';

// Zod schema for search form validation
export const searchSchema = z
  .string()
  .trim()
  .min(1, 'Search cannot be empty')
  .max(100, 'Search too long');

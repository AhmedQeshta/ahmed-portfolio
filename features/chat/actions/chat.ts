'use server';

import { chatSchema } from '../schema';
import { IErrors, IFormState } from '../types/chat-system';

export async function sendChatMessage(prevState: IFormState, formData: FormData) {
  const formInput = {
    message: formData.get('message') as string,
  };

  // Validate input using Zod
  const validation = chatSchema.safeParse(formInput);

  if (!validation.success) {
    const errors: IErrors = {};

    validation.error.errors.forEach((error) => {
      const field = error.path[0] as keyof IErrors;
      if (field && field !== 'general') {
        errors[field] = error.message;
      }
    });

    return { errors };
  }

  const { message } = validation.data;

  try {
    // logic to send to AI to answer the question

    return {
      errors: {},
      success: true,
      message: message,
    };
  } catch (error) {
    console.error('Message sending error:', error);
    return {
      errors: {
        general: 'An unexpected error occurred. Please try again later.',
      },
    };
  }
}

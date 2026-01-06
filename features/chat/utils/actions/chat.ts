'use server';

import { chatSchema } from '@/features/chat/schema';
import { IErrors, IFormState } from '@/features/chat/types/chat-system';
import {
  generateAIResponse,
  getFallbackResponse,
  validateAIConfig,
} from '@/features/chat/lib/services/ai';
import {
  getCachedSiteContent,
  formatContentForAI,
} from '@/features/chat/lib/services/sanity-content';

// Fallback responses when AI is not available

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
    let aiResponse: string;

    // Check if AI is properly configured
    if (validateAIConfig()) {
      try {
        // Fetch site content from Sanity CMS
        const siteContent = await getCachedSiteContent();
        const contextString = formatContentForAI(siteContent);

        // Generate AI response with site context
        const response = await generateAIResponse(message, contextString, {
          maxTokens: 300,
          temperature: 0.7,
        });

        aiResponse = response.content;
      } catch (aiError) {
        console.error('AI generation failed, using fallback:', aiError);
        aiResponse = await getFallbackResponse(message);
      }
    } else {
      // AI not configured, use fallback
      console.warn('OpenAI not configured, using fallback responses');
      aiResponse = await getFallbackResponse(message);
    }

    return {
      errors: {},
      success: true,
      userMessage: message,
      aiResponse: aiResponse,
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

'use server';

import { chatSchema } from '@/features/chat/schema';
import { IErrors, IFormState } from '@/features/chat/types/chat-system';
import { generateAIResponse, validateAIConfig } from '@/features/chat/lib/services/ai';
import {
  getCachedSiteContent,
  formatContentForAI,
} from '@/features/chat/lib/services/sanity-content';

// Fallback responses when AI is not available
async function getFallbackResponse(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase();

  // Portfolio-specific responses
  if (
    message.includes('about') ||
    message.includes('who are you') ||
    message.includes('who is ahmed')
  ) {
    return "I'm an AI assistant for Ahmed's portfolio website. I can help you learn about his background, skills, projects, and services. You can learn more about Ahmed Qeshta, including his background, skills, and availability, by checking out his bio section on the homepage.";
  }

  if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
    return "Ahmed has worked on various exciting projects! You can explore them in the Projects section where you'll find detailed case studies, technologies used, and project outcomes. Each project showcases different skills and approaches.";
  }

  if (
    message.includes('service') ||
    message.includes('hire') ||
    message.includes('work together')
  ) {
    return 'Ahmed offers various services including web development, mobile app development, and consulting. Check out the Services page for detailed information about what he can help you with, or visit the Contact page to get in touch!';
  }

  if (message.includes('blog') || message.includes('article') || message.includes('writing')) {
    return "Ahmed regularly shares insights and tutorials on his blog. You can find articles about development, best practices, and industry trends in the Blog section. It's a great resource for learning!";
  }

  if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
    return "You can reach Ahmed through the Contact page where you'll find his email, social media links, and a contact form. He's always open to discussing new opportunities and interesting projects!";
  }

  if (
    message.includes('skill') ||
    message.includes('technology') ||
    message.includes('tech stack')
  ) {
    return 'Ahmed works with modern technologies including React, Next.js, TypeScript, Node.js, and more. You can find a comprehensive list of his skills and technologies on the About page, along with his experience level in each.';
  }

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! 👋 Welcome to Ahmed's portfolio! I'm here to help you explore his work, skills, and services. What would you like to know about?";
  }

  if (message.includes('experience') || message.includes('background')) {
    return 'Ahmed has extensive experience in full-stack development with a focus on modern web technologies. Check out the About page for his detailed background, education, and professional journey.';
  }

  // Default response for unrecognized queries
  return "I'm not sure about that specific question, but you can explore more on the site! Try asking about Ahmed's projects, services, blog posts, or how to get in touch. I'm here to help you navigate his portfolio.";
}

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

        // Log usage for monitoring (optional)
        if (response.usage) {
          console.log('AI Usage:', response.usage);
        }
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

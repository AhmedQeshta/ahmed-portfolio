import OpenAI from 'openai';
import { AIResponse, ChatMessage } from '@/features/chat/types/chat-system';
import { getCachedSiteContent } from '@/features/chat/lib/services/sanity-content';
import { examplesResponses, fallbackResponse, instructions } from '@/features/chat/lib/constant';

// Lazy initialization of OpenAI client - only create when API key exists
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !apiKey.startsWith('sk-')) {
    return null;
  }
  return new OpenAI({
    apiKey,
  });
}

/**
 * Generate AI response using OpenAI GPT
 */
export async function generateAIResponse(
  userMessage: string,
  siteContext: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  },
): Promise<AIResponse> {
  const model = options?.model || process.env.OPENAI_MODEL || 'gpt-4o';

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are an intelligent assistant for Ahmed's portfolio website. You help visitors understand the site's content and navigate to relevant sections.\n
SITE CONTENT CONTEXT:\n
${siteContext}\n
${instructions}\n
${examplesResponses}\n
`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];

  const openai = getOpenAIClient();
  if (!openai) {
    // No API key configured, use fallback
    return {
      content: await getFallbackResponse(userMessage),
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: options?.maxTokens || 300,
      temperature: options?.temperature || 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response generated from AI');
    }

    return {
      content: responseContent,
      usage: completion.usage
        ? {
            prompt_tokens: completion.usage.prompt_tokens,
            completion_tokens: completion.usage.completion_tokens,
            total_tokens: completion.usage.total_tokens,
          }
        : undefined,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Fallback response
    return {
      content: await getFallbackResponse(userMessage),
    };
  }
}

/**
 * Generate fallback AI response
 */
export async function getFallbackResponse(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase();
  // Try to fetch cvUrl for richer responses (cached fetch)
  let cvUrl: string | undefined = undefined;
  try {
    const content = await getCachedSiteContent();
    cvUrl = content?.baseInfo?.cvUrl;
  } catch {}

  // Portfolio-specific responses
  if (
    message.includes('about') ||
    message.includes('who are you') ||
    message.includes('who is ahmed')
  ) {
    const cvLine = cvUrl ? ` You can also download his CV here: ${cvUrl}.` : '';
    return `I'm an AI assistant for Ahmed's portfolio website. I can help you learn about his background, skills, projects, and services. You can learn more about Ahmed Qeshta, including his background, skills, and availability, by checking out his bio section on the homepage.${cvLine}`;
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
    return 'Ahmed works with modern technologies including React, Next.js, TypeScript, Node.js, and more. You can find a comprehensive overview of his skills in the bio section on the homepage, along with his experience level in each.';
  }

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! 👋 Welcome to Ahmed's portfolio! I'm here to help you explore his work, skills, and services. What would you like to know about?";
  }

  if (message.includes('experience') || message.includes('background')) {
    const cvLine = cvUrl ? ` You can also download his CV here: ${cvUrl}.` : '';
    return `Ahmed has extensive experience in full-stack development with a focus on modern web technologies. You can read more in his bio section on the homepage.${cvLine}`;
  }

  // CV-specific queries
  if (
    message.includes('cv') ||
    message.includes('resume') ||
    message.includes('curriculum vitae')
  ) {
    if (cvUrl) {
      return `You can download Ahmed's CV here: ${cvUrl}.`;
    }
    return "You can download Ahmed's CV from the header or contact section of the site.";
  }

  // Default response for unrecognized queries
  return "I'm not sure about that specific question, but you can explore more on the site! Try asking about Ahmed's projects, services, blog posts, or how to get in touch. I'm here to help you navigate his portfolio.";
}

/**
 * Validate OpenAI configuration
 */
export function validateAIConfig(): boolean {
  return !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-'));
}

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
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
      content: `You are an intelligent assistant for Ahmed's portfolio website. You help visitors understand the site's content and navigate to relevant sections.

SITE CONTENT CONTEXT:
${siteContext}

INSTRUCTIONS:
- Answer questions clearly based on the provided site content in natural paragraph form
- Provide conversational responses without markdown links or formatting
- For questions about Ahmed's background, mention that his bio section on the homepage contains detailed information about his skills, experience, and availability
- Keep replies concise unless the user asks for more detail
- If you don't know something or it's not in the site content, say: "I'm not sure about that, but you can explore more on the site."
- Be helpful, friendly, and professional
- Focus on Ahmed's skills, projects, blog posts, and services
- Provide actionable guidance in a conversational tone

Examples of good responses:
- "Ahmed has experience with React and Next.js. You can see his projects in the Projects section or learn more about his background in his bio section on the homepage."
- "Check out his latest blog post about React 19 in the Blog section."
- "For collaboration opportunities, you can reach out through the contact page."`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];

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
      content:
        "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to explore the site directly!",
    };
  }
}

/**
 * Validate OpenAI configuration
 */
export function validateAIConfig(): boolean {
  return !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-'));
}

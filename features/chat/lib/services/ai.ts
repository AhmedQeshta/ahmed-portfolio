import OpenAI from 'openai';
import { AIResponse, ChatMessage } from '@/features/chat/types/chat-system';
import { getCachedSiteContent } from '@/features/chat/lib/services/sanity-content';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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
- Provide conversational responses without markdown formatting; include URLs as plain text when helpful (e.g., https://..., /projects/slug)
- For questions about Ahmed's background, mention that his bio section on the homepage contains detailed information about his skills, experience, and availability
- If a CV link (cvUrl) is available in the site content, include it when users ask about his CV, resume, or background
- Keep replies concise unless the user asks for more detail
- If you don't know something or it's not in the site content, say: "I'm not sure about that, but you can explore more on the site."
- Be helpful, friendly, and professional
- Focus on Ahmed's skills, projects, blog posts, and services
- If the user asks about Ahmed's background, mention that his bio section on the homepage contains detailed information about his skills, experience, and availability
- Provide actionable guidance in a conversational tone
- If the user asks about Ahmed's background, mention that his bio section on the homepage contains detailed information about his skills, experience, and availability
- If the user asks about Ahmed's projects, mention that his projects section contains detailed information about his projects
- If the user asks about Ahmed's services, mention that his services section contains detailed information about his services
- If the user asks about Ahmed's blog posts, mention that his blog section contains detailed information about his blog posts
- If the user asks about Ahmed's contact information, mention that his contact section contains detailed information about his contact information
- Focus on Ahmed's skills, projects, blog posts, and services
- Provide actionable guidance in a conversational tone
- If the user asks about Ahmed's background, mention that his bio section on the homepage contains detailed information about his skills, experience, and availability
- If the user asks about Ahmed's projects, mention that his projects section contains detailed information about his projects
- If the user asks about Ahmed's services, mention that his services section contains detailed information about his services
- If the user asks about Ahmed's blog posts, mention that his blog section contains detailed information about his blog posts
- If the user asks about Ahmed's contact information, mention that his contact section contains detailed information about his contact information
- If the user asks about Ahmed's skills, mention that his bio section on the homepage contains detailed information about his skills
- If the user asks about Ahmed's experience, mention that his bio section on the homepage contains detailed information about his experience
- If the user asks about Ahmed's availability, mention that his bio section on the homepage contains detailed information about his availability
- If the user asks about Ahmed's projects, mention that his projects section contains detailed information about his projects
- If the user asks about Ahmed's services, mention that his services section contains detailed information about his services
- If the user asks about Ahmed's blog posts, mention that his blog section contains detailed information about his blog posts
- If the user asks about Ahmed's contact information, mention that his contact section contains detailed information about his contact information


Examples of good responses:
- "Ahmed has experience with React and Next.js. You can see his projects in the Projects section or learn more about his background in his bio section on the homepage."
- "Ahmed who speaks Arabic and English, combines extensive technical knowledge with real-world product delivery expertise."
- "Ahmed backend skills in Node.js, Express.js, Laravel, and PostgreSQL enable him to provide real-time features and reliable REST APIs. After completing rigorous training in DevOps, AWS, and full-stack development through Gaza Sky Geeks."
- "Ahmed graduated with a degree in Computer Engineering from the Islamic University of Gaza"
- "Ahmed is proficient in deployment workflows, GitHub Actions, Docker, and cloud integrations, and he has led projects involving full-stack fitness platforms, internationalization, and video conferencing (Agora)."
- "Ahmed Qeshta is a Full-Stack Developer and Computer Engineer with expertise in creating scalable, search engine optimized web applications. He has contributed to high-traffic platforms using React.js, Next.js, and contemporary frontend tools while working with top teams like Unit One Group and 7AWI Media Group."

- "Ahmed worked as Frontend Engineer at Unit One Group that Contracted to 7AWI Media Group for 2 year."
- "When ahmed work as FrontEnd Engineer at Uint One Group, He Utilizing React.js, Next.js, React Query, TailwindCSS, HTML, CSS, and JavaScript, He created and maintained responsive, search engine optimization-friendly frontend solutions for popular websites like incarabia.com and EN.INCARABIA.COM."
- "Ahmed Substantial improvements in SEO scores and a 90% increase in page load speed, indicating a significant improvement in website performance."
- "Ahmed worked as Full Stack Developer at EduReach for 9 months."
- "Ahmed Enhanced user experience and interaction by delivering reliable video conferencing solutions through the integration of WebRTC technology through Agora.io."
- "Ahmed worked as Full Stack Developer Intern at Google for Startups for 7 months."
- "Ahmed worked as Full Stack Developer Freelance."
- "Check out his latest blog post about React 19 in the Blog section."
- "Ahmed Qeshta, fluent in Arabic and English, is a Full Stack Engineer skilled in React, Next.js, Laravel, and Node.js, with a proven record of delivering high-performance, SEO-optimized platforms and mentoring development teams."
- "Ahmed Qeshta is a bilingual Full Stack Engineer who builds scalable, SEO-friendly web solutions using React, Next.js, Laravel, and Node.js."
- "Ahmed Qeshta, a Full Stack Engineer fluent in Arabic and English, delivers high-performance platforms and mentors teams in modern web technologies."
- "Ahmed Qeshta specializes in React, Next.js, Laravel, and Node.js, with expertise in performance optimization and team leadership."
- "Ahmed Qeshta combines technical depth in React, Next.js, and Laravel with real-world experience improving speed, SEO, and developer productivity."
- "Ahmed Qeshta creates scalable, user-focused web platforms and trains teams in cutting-edge frontend and backend technologies."
- "For collaboration opportunities, you can reach out through the contact page"`,
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    const completion = await openai?.chat?.completions?.create({
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

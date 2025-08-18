export interface IChatContainer {
  isOpen: boolean;
}

export interface IMessage {
  id: number;
  text: string;
  user: string;
}

export interface IChatBoxProps {
  messages: IMessage[];
}

export interface IErrors {
  message?: string;
  general?: string;
}

export interface IChatInputs {
  message: string;
}

export interface IFormState {
  errors: IErrors;
  success?: boolean;
  userMessage?: string;
  aiResponse?: string;
}

export interface IMessageProps {
  text: string;
  user: string;
  index: number;
}

export interface IMessageIconProps {
  user: string;
}

export interface IChatInputProps {
  sendMessage: (value: IMessage) => void;
}

export interface IChatBoxRef {
  scrollToBottom: () => void;
}

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

export interface SiteContent {
  baseInfo: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    availability: string;
    cvUrl?: string;
  };
  projects: Array<{
    title: string;
    description: string;
    slug: string;
    technologies: string[];
    status: string;
    liveUrl?: string;
    repoUrl?: string;
  }>;
  blogPosts: Array<{
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    tags: string[];
  }>;
  workExperience: Array<{
    title: string;
    company: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
  }>;
}

export interface IContentCache {
  data: SiteContent | null;
  timestamp: number;
}

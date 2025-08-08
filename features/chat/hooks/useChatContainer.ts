import { useRef } from 'react';
import { useState } from 'react';
import { IMessage, IChatBoxRef } from '@/features/chat/types/chat-system';

export default function useChatContainer() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      text: "👋 Hi there! I'm Ahmed's AI assistant. I'm here to help you explore his portfolio, learn about his projects, skills, and services. What would you like to know?",
      user: 'system',
    },
  ]);

  const chatBoxRef = useRef<IChatBoxRef>(null);

  const sendMessage = (value: IMessage) => {
    setMessages([...messages, value]);
  };
  return { messages, sendMessage, chatBoxRef };
}

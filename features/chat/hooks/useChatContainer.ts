import { useRef } from 'react';
import { useState } from 'react';
import { IMessage, IChatBoxRef } from '@/features/chat/types/chat-system';
import { initialMessageValue } from '@/features/chat/lib/constant';

// constant

export default function useChatContainer() {
  const [messages, setMessages] = useState<IMessage[]>(initialMessageValue);

  const chatBoxRef = useRef<IChatBoxRef>(null);

  const sendMessage = (value: IMessage) => setMessages([...messages, value]);

  return { messages, sendMessage, chatBoxRef };
}

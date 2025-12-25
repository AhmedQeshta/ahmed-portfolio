import { useRef, useCallback } from 'react';
import { useState } from 'react';
import { IMessage, IChatBoxRef } from '@/features/chat/types/chat-system';
import { initialMessageValue } from '@/features/chat/lib/constant';

// constant
const MAX_MESSAGES = 50; // Limit messages to prevent memory issues

export default function useChatContainer() {
  const [messages, setMessages] = useState<IMessage[]>(initialMessageValue);

  const chatBoxRef = useRef<IChatBoxRef>(null);

  const sendMessage = useCallback((value: IMessage) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, value];
      // Keep only the last MAX_MESSAGES messages (including initial message)
      if (newMessages.length > MAX_MESSAGES) {
        // Keep initial message and the most recent messages
        return [initialMessageValue[0], ...newMessages.slice(-(MAX_MESSAGES - 1))];
      }
      return newMessages;
    });
  }, []);

  return { messages, sendMessage, chatBoxRef };
}

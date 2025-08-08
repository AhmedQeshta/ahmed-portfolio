import { useEffect } from 'react';

import { useImperativeHandle } from 'react';

import { useRef } from 'react';
import { IMessage, IChatBoxRef } from '../types/chat-system';

export default function useChatBox(messages: IMessage[], ref: any) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Expose scrollToBottom function to parent
  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));

  // Auto-scroll when messages change with slight delay for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 150);

    return () => clearTimeout(timer);
  }, [messages]);

  return { chatContainerRef };
}

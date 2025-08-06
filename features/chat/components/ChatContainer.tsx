'use client';
import { IChatContainer, IMessage } from '@/features/chat/types/chat-system';
import ChatBox from '@/features/chat/components/ChatBox';
import ChatInput from '@/features/chat/components/ChatInput';
import { useState } from 'react';

export default function ChatContainer({ isOpen }: IChatContainer) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'text 1', user: 'system' },
    { id: 2, text: 'text 2', user: 'visitor' },
  ]);
  if (!isOpen) return null;

  const sendMessage = (value: any) => {
    setMessages([...messages, value]);
  };

  return (
    <div className="absolute p-4  bottom-16 flex flex-col max-w-md  min-h-[400px] bg-card-bg backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 ease-in-out z-50 w-[350px] h-[55vh] right-0 md:w-[420px] md:h-[60vh] lg:w-[450px] lg:h-[65vh]  xl:w-[480px] xl:h-[70vh] hover:border-white/30 hover:shadow-white/10">
      {/* chat box */}
      <ChatBox messages={messages} />
      {/* input message and btn with icon */}
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

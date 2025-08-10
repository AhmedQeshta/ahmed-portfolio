'use client';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ChatContainer from '@/features/chat/components/ChatContainer';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const openChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <ChatContainer isOpen={isOpen} />
      <button
        onClick={openChat}
        className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25"
        aria-label="Open chat">
        <MessageCircle
          size={20}
          className="group-hover:scale-110 transition-transform duration-200"
        />
      </button>
    </div>
  );
}

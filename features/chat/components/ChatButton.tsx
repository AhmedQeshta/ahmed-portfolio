'use client';
import { MessageCircle } from 'lucide-react';
import ChatContainer from '@/features/chat/components/ChatContainer';
import useChatButton from '@/features/chat/hooks/useChatButton';

export default function ChatButton() {
  const { isOpen, openChat } = useChatButton();

  return (
    <div className="relative">
      <ChatContainer isOpen={isOpen} />
      <button
        onClick={openChat}
        className="group relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25"
        aria-label="Open chat">
        <MessageCircle
          size={20}
          className="group-hover:scale-110 transition-transform duration-200"
        />
        <span className="pointer-events-none absolute -top-1 -left-1" aria-hidden="true">
          <span className="relative flex h-4 w-4 transition-transform duration-200 group-hover:scale-110">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400/60 blur-[1px]"></span>
            <span className="absolute inline-flex h-full w-full rounded-full bg-pink-500/30 animate-pulse"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-br from-pink-500 to-purple-500 ring-2 ring-white/80 shadow-md"></span>
          </span>
        </span>
      </button>
    </div>
  );
}

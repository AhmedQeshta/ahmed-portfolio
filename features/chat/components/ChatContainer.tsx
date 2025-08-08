'use client';
import { IChatContainer } from '@/features/chat/types/chat-system';
import ChatBox from '@/features/chat/components/ChatBox';
import ChatInput from '@/features/chat/components/ChatInput';
import useChatContainer from '../hooks/useChatContainer';

export default function ChatContainer({ isOpen }: IChatContainer) {
  const { messages, sendMessage, chatBoxRef } = useChatContainer();

  if (!isOpen) return null;

  return (
    <div className="absolute p-4  bottom-16 flex flex-col max-w-md  min-h-[400px] bg-card-bg backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 ease-in-out z-50 w-[350px] h-[55vh] right-0 md:w-[420px] md:h-[60vh] lg:w-[450px] lg:h-[65vh]  xl:w-[480px] xl:h-[70vh] hover:border-white/30 hover:shadow-white/10">
      {/* chat box */}
      <ChatBox ref={chatBoxRef} messages={messages} />
      {/* input message and btn with icon */}
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

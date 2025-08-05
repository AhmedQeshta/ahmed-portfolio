'use client';
import { IChatContainer, IMessage } from '@/features/chat/types/chat-system';
import ChatBox from '@/features/chat/components/ChatBox';
import ChatInput from '@/features/chat/components/ChatInput';

export default function ChatContainer({ isOpen }: IChatContainer) {
  if (!isOpen) return null;
  /**
   * the chat container it is a chat box that have the messages (questions, answers)
   * and input to send the question and button to send message the btn it is an icon
   * and it is should responsive
   *  */
  return (
    <div
      className="absolute p-4 right-0 bottom-16 flex flex-col w-full max-w-md h-[70vh] min-h-[400px] bg-card-bg backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 ease-in-out z-50
    sm:w-96 sm:h-[65vh] sm:right-0
    md:w-[420px] md:h-[60vh] md:right-0
    lg:w-[450px] lg:h-[55vh] lg:right-0
    xl:w-[480px] xl:h-[50vh] xl:right-0
    hover:border-white/30 hover:shadow-white/10">
      {/* chat box */}
      <ChatBox />
      {/* input message and btn with icon */}
      <ChatInput />
    </div>
  );
}

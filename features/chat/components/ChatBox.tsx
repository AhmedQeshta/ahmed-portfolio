import { IChatBoxProps } from '@/features/chat/types/chat-system';
import Message from '@/features/chat/components/Message';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface ChatBoxRef {
  scrollToBottom: () => void;
}

const ChatBox = forwardRef<ChatBoxRef, IChatBoxProps>(({ messages }, ref) => {
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

  return (
    <div
      ref={chatContainerRef}
      className="w-full overflow-x-hidden overflow-y-auto flex-1 bg-card-bg/50 p-4 rounded-xl mb-3 shadow-inner border border-white/10 backdrop-blur-sm
    scrollbar-thin scrollbar-thumb-orb-purple/30 scrollbar-track-transparent
    hover:scrollbar-thumb-orb-purple/50 transition-all duration-300 scroll-smooth">
      <div className="flex flex-col gap-4">
        {messages?.map(({ id, ...restProps }, index) => (
          <Message key={id} {...restProps} index={index} />
        ))}
      </div>
    </div>
  );
});

ChatBox.displayName = 'ChatBox';

export default ChatBox;

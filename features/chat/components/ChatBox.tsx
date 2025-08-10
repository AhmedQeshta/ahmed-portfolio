import { IChatBoxProps, IChatBoxRef } from '@/features/chat/types/chat-system';
import Message from '@/features/chat/components/Message';
import { forwardRef } from 'react';
import useChatBox from '../hooks/useChatBox';

const ChatBox = forwardRef<IChatBoxRef, IChatBoxProps>(({ messages }, ref) => {
  const { chatContainerRef } = useChatBox(messages, ref);
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

export default ChatBox;

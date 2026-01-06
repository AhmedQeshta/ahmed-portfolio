'use client';
import { IChatBoxProps, IChatBoxRef } from '@/features/chat/types/chat-system';
import Message from '@/features/chat/components/Message';
import { forwardRef, Ref } from 'react';
import useChatBox from '../hooks/useChatBox';
import { useTheme } from '@/features/theme/hooks/useTheme';

function ChatBox({ messages }: IChatBoxProps, ref: IChatBoxRef) {
  const { chatContainerRef } = useChatBox(messages, ref as unknown as Ref<IChatBoxRef>);
  const { isDark } = useTheme();

  return (
    <div
      ref={chatContainerRef}
      className={`w-full overflow-x-hidden overflow-y-auto flex-1 ${isDark ? 'bg-card-bg/50' : 'bg-purple-200/30'} p-4 rounded-xl mb-3 shadow-inner border ${isDark ? 'border-white/10' : 'border-purple-600/10'}  backdrop-blur-sm scrollbar-thin scrollbar-thumb-orb-purple/30 scrollbar-track-transparent hover:scrollbar-thumb-orb-purple/50 transition-all duration-300 scroll-smooth`}>
      <div className="flex flex-col gap-4">
        {messages?.map(({ id, ...restProps }, index) => (
          <Message key={id} {...restProps} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ChatBox;

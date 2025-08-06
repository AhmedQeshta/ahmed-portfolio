import { IChatBoxProps } from '@/features/chat/types/chat-system';
import Message from '@/features/chat/components/Message';

export default function ChatBox({ messages }: IChatBoxProps) {
  return (
    <div
      className="w-full overflow-x-hidden overflow-y-auto flex-1 bg-card-bg/50 p-4 rounded-xl mb-3 shadow-inner border border-white/10 backdrop-blur-sm
    scrollbar-thin scrollbar-thumb-orb-purple/30 scrollbar-track-transparent
    hover:scrollbar-thumb-orb-purple/50 transition-all duration-300">
      <div className="flex flex-col gap-4">
        {messages?.map(({ id, ...restProps }, index) => (
          <Message key={id} {...restProps} index={index} />
        ))}
      </div>
    </div>
  );
}

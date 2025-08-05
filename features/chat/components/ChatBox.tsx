import { IChatBoxProps } from '@/features/chat/types/chat-system';
import { Info, User, Bot } from 'lucide-react';

export default function ChatBox() {
  const messages = [
    { id: 1, text: 'text 1', user: 'system' },
    { id: 2, text: 'text 2', user: 'visiter' },
    { id: 3, text: 'text 3', user: 'visiter' },
    { id: 4, text: 'text 1 2', user: 'system' },
    { id: 5, text: 'text 1 6', user: 'system' },
    { id: 6, text: 'text 3 4', user: 'visiter' },
    { id: 7, text: 'text 3 7', user: 'visiter' },
  ];
  return (
    <div
      className="w-full overflow-x-hidden overflow-y-auto flex-1 bg-card-bg/50 p-4 rounded-xl mb-3 shadow-inner border border-white/10 backdrop-blur-sm
    scrollbar-thin scrollbar-thumb-orb-purple/30 scrollbar-track-transparent
    hover:scrollbar-thumb-orb-purple/50 transition-all duration-300">
      <div className="flex flex-col gap-4">
        {messages?.map(({ id, ...restProps }, index) =>
          restProps.user === 'visiter' ? (
            <VisiterMessage key={id} {...restProps} index={index} />
          ) : (
            <SystemMessage key={id} {...restProps} index={index} />
          ),
        )}
      </div>
    </div>
  );
}

const SystemMessage = ({ text, user, index }: any) => {
  return (
    <div
      className="flex items-start gap-3 group animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div
          className="w-10 h-10 bg-orb-purple/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20
        group-hover:bg-orb-purple/60 group-hover:scale-110 transition-all duration-300 ease-out">
          <Bot
            size={18}
            className="text-text-accent group-hover:text-text-primary transition-colors duration-300"
          />
        </div>
        <span className="text-text-secondary text-xs opacity-70 font-medium">AI Assistant</span>
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="bg-orb-purple/20 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-sm
        group-hover:bg-orb-purple/30 group-hover:border-white/30 group-hover:shadow-lg
        transform group-hover:scale-[1.02] transition-all duration-300 ease-out
        animate-slideInLeft"
          style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
          <p className="text-text-primary text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
};

const VisiterMessage = ({ text, user, index }: any) => {
  return (
    <div
      className="flex items-start gap-3 group justify-end animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex-1 min-w-0">
        <div
          className="bg-orb-blue/20 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-sm text-right
        group-hover:bg-orb-blue/30 group-hover:border-white/30 group-hover:shadow-lg
        transform group-hover:scale-[1.02] transition-all duration-300 ease-out
        animate-slideInRight"
          style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
          <p className="text-text-primary text-sm leading-relaxed">{text}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div
          className="w-10 h-10 bg-orb-blue/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20
        group-hover:bg-orb-blue/60 group-hover:scale-110 transition-all duration-300 ease-out">
          <User
            size={18}
            className="text-text-accent group-hover:text-text-primary transition-colors duration-300"
          />
        </div>
        <span className="text-text-secondary text-xs opacity-70 font-medium">You</span>
      </div>
    </div>
  );
};

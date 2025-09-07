'use client';
import MessageIcon from '@/features/chat/components/MessageIcon';
import { IMessageProps } from '@/features/chat/types/chat-system';
import renderTextWithLinks from '@/features/chat/components/renderTextWithLinks';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Message({ text, user, index }: IMessageProps) {
  const { isDark } = useTheme();
  return (
    <div
      className={`flex items-start gap-3 group animate-fadeInUp ${user === 'system' ? 'flex-row-reverse' : 'justify-end'}`}
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex-1 min-w-0">
        <div
          className={`${isDark ? 'border-white/20 group-hover:border-white/30' : 'border-purple-500/20 group-hover:border-purple-500/30'}bg-orb-blue/20 backdrop-blur-sm border  rounded-2xl p-4 shadow-sm group-hover:bg-orb-blue/30  group-hover:shadow-lg transform group-hover:scale-[1.02] transition-all duration-300 ease-out ${user === 'visitor' ? 'animate-slideInRight text-right' : 'animate-slideInLeft'}`}
          style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
          <p className="text-text-primary text-sm leading-relaxed">{renderTextWithLinks(text)}</p>
        </div>
      </div>

      <MessageIcon user={user} />
    </div>
  );
}

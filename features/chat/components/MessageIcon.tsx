'use client';
import { Bot, User } from 'lucide-react';
import { IMessageIconProps } from '@/features/chat/types/chat-system';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function MessageIcon({ user }: IMessageIconProps) {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <div
        className={`w-10 h-10 bg-orb-blue/40 rounded-full flex items-center justify-center backdrop-blur-sm border ${isDark ? 'border-white/30' : 'border-purple-600/30'} group-hover:bg-orb-blue/60 group-hover:scale-110 transition-all duration-300 ease-out`}>
        {user === 'visitor' ? (
          <User
            size={18}
            className="text-text-accent group-hover:text-text-primary transition-colors duration-300"
          />
        ) : (
          <Bot
            size={18}
            className="text-text-accent group-hover:text-text-primary transition-colors duration-300"
          />
        )}
      </div>
      <span className="text-text-secondary text-xs opacity-70 font-medium">
        {user === 'visitor' ? 'You' : 'AI Assistant'}
      </span>
    </div>
  );
}

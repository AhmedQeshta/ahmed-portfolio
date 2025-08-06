'use client';
import DefaultInput from '@/features/shard/components/form/DefaultInput';
import { Send } from 'lucide-react';
import useChat from '@/features/chat/hooks/useChat';
import { IChatInputProps } from '@/features/chat/types/chat-system';

export default function ChatInput({ sendMessage }: IChatInputProps) {
  const { formAction, handleSubmit, isPending, formData, handleInputChange, displayErrors } =
    useChat({ sendMessage });

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="flex items-start w-full gap-3">
        {/* input */}
        <div className="flex flex-col gap-1 w-full">
          <DefaultInput
            name="message"
            type="text"
            value={formData.message}
            handleInputChange={handleInputChange}
            displayErrors={displayErrors.message}
            placeholder="Type your message..."
            autoComplete="off"
            autoCorrect="off"
            autoFocus={true}
            style={{ WebkitAppearance: 'none' }}
            customStyle="text-text-primary placeholder-text-secondary bg-card-bg/50 backdrop-blur-sm border border-white/20 rounded-xl focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300
            hover:border-white/30 hover:bg-card-bg/70"
          />
        </div>

        {/* btn send */}
        <button
          type="submit"
          aria-label="send message"
          disabled={isPending}
          className="group flex items-center justify-center w-11 h-10 rounded-full cursor-pointer 
          bg-orb-purple/20 backdrop-blur-sm border border-white/20 
          hover:bg-orb-purple/30 hover:border-white/30 hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
          {isPending ? (
            <div className="w-5 h-5 border-2 border-text-accent/30 border-t-text-accent rounded-full animate-spin" />
          ) : (
            <Send
              size={18}
              className="text-text-accent group-hover:text-text-primary transition-colors duration-300"
            />
          )}
        </button>
      </div>
    </form>
  );
}

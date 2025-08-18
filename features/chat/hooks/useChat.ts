import { FormEvent, useActionState, useState, useEffect, useRef } from 'react';
import { IChatInputs, IErrors } from '@/features/chat/types/chat-system';
import { chatSchema } from '@/features/chat/schema';
import z from 'zod';
import { sendChatMessage } from '@/features/chat/utils/actions/chat';

export default function useChat({ sendMessage }: any) {
  const initialStatus = {
    errors: {},
    success: false,
    userMessage: '',
    aiResponse: '',
  } as const;

  const [state, formAction, isPending] = useActionState(sendChatMessage, initialStatus);
  const [formData, setFormData] = useState<IChatInputs>({
    message: '',
  });
  const [clientErrors, setClientErrors] = useState<IErrors>({});
  const lastProcessedResponse = useRef<string>('');

  // Handle AI response when server action completes
  useEffect(() => {
    if (state?.success && state?.aiResponse && state.aiResponse !== lastProcessedResponse.current) {
      // Add AI response to chat
      sendMessage({
        id: Math.floor(Math.random() * 999999),
        text: state.aiResponse,
        user: 'system',
      });

      // Mark this response as processed
      lastProcessedResponse.current = state.aiResponse;
    }
  }, [state?.success, state?.aiResponse]); // Removed sendMessage from dependencies

  // Handle input changes and real-time validation
  const handleInputChange = (field: keyof IChatInputs, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Clear previous client error for this field
    if (clientErrors[field]) {
      setClientErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Validate single field
    try {
      const fieldSchema = z.object({ [field]: chatSchema.shape[field] });
      fieldSchema.parse({ [field]: value });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message;
        if (fieldError) {
          setClientErrors((prev) => ({ ...prev, [field]: fieldError }));
        }
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formDataObj = new FormData(event.currentTarget);
    const data = {
      message: formDataObj.get('message') as string,
    };

    // Client-side validation
    const validation = chatSchema.safeParse(data);

    if (!validation.success) {
      event.preventDefault();
      const errors: IErrors = {};

      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof IErrors;
        if (field && field !== 'general') {
          errors[field] = error.message;
        }
      });

      setClientErrors(errors);
      return;
    }

    // Add user message immediately for instant feedback
    sendMessage({
      id: Math.floor(Math.random() * 999999),
      text: formData.message,
      user: 'visitor',
    });

    // Clear the input
    setFormData({ ...formData, message: '' });

    // Clear client errors if validation passes
    setClientErrors({});
  };

  const displayErrors = {
    message: clientErrors.message || (state?.errors as IErrors)?.message,
    general: (state?.errors as IErrors)?.general,
  };

  return { formAction, handleSubmit, isPending, formData, handleInputChange, displayErrors };
}

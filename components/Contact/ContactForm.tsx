'use client';

import { FormState, sendMessage } from '@/utils/actions/contact';
import { useActionState, useState } from 'react';
import { z } from 'zod';
import ScrollAnimation from '../ui/ScrollAnimation';

// Client-side validation schema (matches server-side)
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').trim(),
  message: z.string().min(1, 'Message is required').trim(),
});

export interface ContactInputs {
  name: string;
  email: string;
  message: string;
}

export interface Errors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

export default function ContactForm() {
  const initialStatus = {
    errors: {},
    success: false,
    message: '',
  } as const;

  const [state, formAction, isPending] = useActionState(sendMessage, initialStatus);
  const [formData, setFormData] = useState<ContactInputs>({
    name: '',
    email: '',
    message: '',
  });
  const [clientErrors, setClientErrors] = useState<Errors>({});

  // Handle input changes and real-time validation
  const handleInputChange = (field: keyof ContactInputs, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Clear previous client error for this field
    if (clientErrors[field]) {
      setClientErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Validate single field
    try {
      const fieldSchema = z.object({ [field]: contactSchema.shape[field] });
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

  // Handle form submission with client-side validation
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formDataObj = new FormData(event.currentTarget);
    const data = {
      name: formDataObj.get('name') as string,
      email: formDataObj.get('email') as string,
      message: formDataObj.get('message') as string,
    };

    // Client-side validation
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      event.preventDefault();
      const errors: Errors = {};

      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof Errors;
        if (field && field !== 'general') {
          errors[field] = error.message;
        }
      });

      setClientErrors(errors);
      return;
    }

    // Clear client errors if validation passes
    setClientErrors({});
  };

  // Combine server and client errors (client errors take precedence)
  const displayErrors = {
    name: clientErrors.name || (state?.errors as Errors)?.name,
    email: clientErrors.email || (state?.errors as Errors)?.email,
    message: clientErrors.message || (state?.errors as Errors)?.message,
    general: (state?.errors as Errors)?.general,
  };

  // Show success message
  if (state?.success) {
    return (
      <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="text-green-400 mb-2">✓ Message Sent!</div>
        <p className="text-white">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 text-sm bg-green-500/20 hover:bg-green-500/30 rounded-md text-green-400 transition-colors">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <div>
          <label htmlFor="name" className="block text-sm text-white mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your Name"
            className={`w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 transition-colors ${
              displayErrors.name
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-white/30 focus:ring-purple-500'
            }`}
          />
          {displayErrors.name && (
            <span className="text-red-400 text-sm mt-1 block">{displayErrors.name}</span>
          )}
        </div>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <div>
          <label htmlFor="email" className="block text-sm text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="you@example.com"
            className={`w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 transition-colors ${
              displayErrors.email
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-white/30 focus:ring-purple-500'
            }`}
          />
          {displayErrors.email && (
            <span className="text-red-400 text-sm mt-1 block">{displayErrors.email}</span>
          )}
        </div>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <div>
          <label htmlFor="message" className="block text-sm text-white mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Your message…"
            className={`w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 transition-colors resize-vertical ${
              displayErrors.message
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-white/30 focus:ring-purple-500'
            }`}
          />
          {displayErrors.message && (
            <span className="text-red-400 text-sm mt-1 block">{displayErrors.message}</span>
          )}
        </div>
      </ScrollAnimation>

      {displayErrors.general && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
          <p className="text-red-400 text-sm">{displayErrors.general}</p>
        </div>
      )}

      <button
        type="submit"
        className="px-6 py-3 gradient-button-primary rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        disabled={isPending}>
        {isPending ? 'Sending ...' : 'Send Message'}
      </button>
    </form>
  );
}

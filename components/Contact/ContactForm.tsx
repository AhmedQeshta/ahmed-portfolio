'use client';

import { FormState, sendMessage } from '@/utils/actions/contact';
import { useActionState } from 'react';

// export interface ContactInputs {
//   name: string;
//   email: string;
//   message: string;
// }

// export interface Errors {
//   name?: string;
//   email?: string;
//   message?: string;
// }

export default function ContactForm() {
  const initialStatus: FormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(sendMessage, initialStatus);

  // const sendMessageAction: ContactInputs = (formData: FormData) => {
  //   const name = formData.get('name') as string;
  //   const email = formData.get('email') as string;
  //   const message = formData.get('message') as string;

  //   const errors: Errors = {};

  //   if (!name) {
  //     errors.name = 'name is required';
  //   }

  //   if (!email) {
  //     errors.email = 'email is required';
  //   }

  //   if (!message) {
  //     errors.message = 'message is required';
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     return { errors };
  //   }

  //   // use zod instance of this error handel
  //   window.location.href = `mailto:ahmed.qeshta.dev@gmail.com?subject=${email}&body=Hi my name is ${name}. ${message} (${email}))`;
  // };

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-white mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your Name"
          className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="text-red-600 text-sm">{state?.errors?.name}</span>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-white mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="text-red-600 text-sm">{state?.errors?.email}</span>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-white mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Your message…"
          className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="text-red-600 text-sm">{state?.errors?.message}</span>
      </div>

      <button
        type="submit"
        className="px-6 py-3 gradient-button-primary rounded-full font-semibold"
        disabled={isPending}>
        {isPending ? 'Sending ...' : 'Send Message'}
      </button>
    </form>
  );
}

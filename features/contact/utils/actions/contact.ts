'use server';

import nodemailer from 'nodemailer';
import { mailOptions, transporter } from '@/features/contact/utils/email';
import { IErrors, IFormState } from '@/features/contact/types/contact';
import { contactSchema } from '@/features/contact/utils/schema';
import { mailChimpRequest } from '../newsletter';

export async function sendMessage(prevState: IFormState, formData: FormData) {
  // Check if this is a reset request
  const isReset = formData.get('_reset') === 'true';

  if (isReset) {
    // Return initial status to reset the state
    return {
      errors: {},
      success: false,
      message: '',
    };
  }

  const formInput = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  // Validate input using Zod
  const validation = contactSchema.safeParse(formInput);

  if (!validation.success) {
    const errors: IErrors = {};

    validation.error.errors.forEach((error) => {
      const field = error.path[0] as keyof IErrors;
      if (field && field !== 'general') {
        errors[field] = error.message;
      }
    });

    return { errors };
  }

  const { name, email, message } = validation.data;

  // Send email
  try {
    const options = mailOptions({ name, email, message });
    const info = await transporter.sendMail(options);

    // Handle newsletter subscription
    const newsletter = formData.get('newsletter') === 'on' ? true : false;
    await mailChimpRequest({ email, name, newsletter });

    return {
      errors: {},
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      errors: {
        general: 'An unexpected error occurred. Please try again later.',
      },
    };
  }
}

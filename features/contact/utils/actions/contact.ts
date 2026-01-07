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

  // Verify reCAPTCHA v3 token before processing form submission
  const recaptchaToken = formData.get('recaptcha_token') as string | null;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (recaptchaSecretKey) {
    // If secret key is configured, token verification is required
    if (!recaptchaToken) {
      return {
        errors: {
          general: 'Security verification failed. Please refresh the page and try again.',
        },
      };
    }

    try {
      // Verify token with Google's reCAPTCHA API
      const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: recaptchaSecretKey,
          response: recaptchaToken,
        }),
      });

      const verificationData = await verificationResponse.json();

      // Check if verification was successful
      if (!verificationData.success) {
        console.error('reCAPTCHA verification failed:', verificationData['error-codes']);
        return {
          errors: {
            general: 'Security verification failed. Please try again.',
          },
        };
      }

      // Check score threshold (reject if score < 0.5)
      // Score ranges from 0.0 (likely bot) to 1.0 (likely human)
      const score = verificationData.score || 0;
      const scoreThreshold = 0.5;

      if (score < scoreThreshold) {
        console.warn(`reCAPTCHA score too low: ${score} (threshold: ${scoreThreshold})`);
        return {
          errors: {
            general: 'Your submission was flagged as potentially suspicious. Please try again.',
          },
        };
      }
    } catch (error) {
      // Network or API error - log but allow submission for graceful degradation
      console.error('reCAPTCHA verification error:', error);
      // In production, you might want to reject here, but for graceful degradation we continue
      // Uncomment the following to reject on verification errors:
      // return {
      //   errors: {
      //     general: 'Security verification service unavailable. Please try again later.',
      //   },
      // };
    }
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

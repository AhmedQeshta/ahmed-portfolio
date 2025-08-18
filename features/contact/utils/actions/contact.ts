'use server';

import nodemailer from 'nodemailer';
import { getHtml, getText } from '@/features/contact/utils/email';
import { IErrors, IFormState } from '@/features/contact/types/contact';
import { contactSchema } from '@/features/contact/utils/schema';

export async function sendMessage(prevState: IFormState, formData: FormData) {
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
    // Create transporter for nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || 'ahmed.qeshta.dev@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: getHtml({ name, email, message }),
      text: getText({ name, email, message }),
    };

    const info = await transporter.sendMail(mailOptions);

    // Handle newsletter subscription
    const newsletter = !!formData.get('newsletter') as boolean;
    if (newsletter) {
      try {
        // Subscribe to Mailchimp newsletter
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

        if (!apiKey || !audienceId || !serverPrefix) {
          return {
            errors: {
              general: 'Mailchimp API key, audience ID, or server prefix is missing',
            },
          };
        }

        const mailchimpEndpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

        const mailchimpData = {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: name.split(' ')[0] || '',
            LNAME: name.split(' ').slice(1).join(' ') || '',
          },
        };

        const mailchimpResponse = await fetch(mailchimpEndpoint, {
          method: 'POST',
          headers: {
            Authorization: `apikey ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mailchimpData),
        });

        if (!mailchimpResponse.ok) {
          const mailchimpError = await mailchimpResponse.json();
          console.log('Mailchimp subscription failed:', mailchimpError);
        } else {
          console.log('Successfully subscribed to newsletter:', email);
        }
      } catch (newsletterError) {
        console.error('Newsletter subscription error:', newsletterError);
        // Don't fail the entire contact form if newsletter subscription fails
      }
    }

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

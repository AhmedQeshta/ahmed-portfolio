'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';
import { getHtml, getText } from '@/utils/email';

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

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').trim(),
  message: z.string().min(1, 'Message is required').trim(),
});

export interface IErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

export interface IFormState {
  errors: IErrors;
  success?: boolean;
  message?: string;
}

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
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || 'ahmed.qeshta.dev@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: getHtml({ name, email, message }),
      text: getText({ name, email, message }),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

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

import nodemailer from 'nodemailer';
import { getHtml, getText } from './template';

// Create transporter for nodemailer
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export interface IMailOptions {
  name: string;
  email: string;
  message: string;
}
export const mailOptions = ({ name, email, message }: IMailOptions) => {
  return {
    from: `"${name}" <${email || process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL || 'ahmed.qeshta.dev@gmail.com',
    replyTo: email,
    subject: `Portfolio Contact from ${name}`,
    html: getHtml({ name, email, message }),
    text: getText({ name, email, message }),
  };
};

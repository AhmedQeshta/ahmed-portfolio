import { Metadata } from 'next';
import { siteUrl } from '@/features/shard/utils/url';
import ContactSection from '@/features/contact/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Me | Ahmed Qeshta',
  description:
    'Get in touch with Ahmed Qeshta, a software engineer specializing in web development, mobile applications, and modern technologies. Contact me for projects, collaborations, or inquiries.',
  keywords: [
    'Ahmed Qeshta',
    'contact',
    'software engineer',
    'web developer',
    'hire developer',
    'contact form',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Me | Ahmed Qeshta',
    description:
      'Get in touch with Ahmed Qeshta for projects, collaborations, or inquiries about web and mobile development',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Me | Ahmed Qeshta',
    description:
      'Get in touch with Ahmed Qeshta for projects, collaborations, or inquiries about web and mobile development',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-16">
      <ContactSection />
    </main>
  );
}

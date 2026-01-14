import { Metadata } from 'next';
import { siteUrl } from '@/features/shard/utils/url';
import PrivacyContent from '@/features/privacy/components/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ahmed Qeshta',
  description:
    'Privacy Policy for Ahmed Qeshta portfolio website. Learn how we collect, use, and protect your personal information, including data collection through Google AdSense, analytics, and contact forms.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'CCPA', 'cookie policy'],
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | Ahmed Qeshta',
    description: 'Privacy Policy for Ahmed Qeshta portfolio website',
    url: `${siteUrl}/privacy`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Ahmed Qeshta',
    description: 'Privacy Policy for Ahmed Qeshta portfolio website',
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 lg:py-24">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 mt-10">
        <PrivacyContent />
      </div>
    </main>
  );
}

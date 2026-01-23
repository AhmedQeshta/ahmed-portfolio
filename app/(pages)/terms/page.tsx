import { Metadata } from 'next';
import { siteUrl } from '@/features/shard/utils/url';
import TermsContent from '@/features/terms/components/TermsContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Ahmed Qeshta',
  description:
    'Terms and Conditions for Ahmed Qeshta portfolio website. Read our rules and regulations for using this website.',
  keywords: ['terms and conditions', 'terms of use', 'legal', 'user agreement'],
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: 'Terms & Conditions | Ahmed Qeshta',
    description: 'Terms and Conditions for Ahmed Qeshta portfolio website',
    url: `${siteUrl}/terms`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms & Conditions | Ahmed Qeshta',
    description: 'Terms and Conditions for Ahmed Qeshta portfolio website',
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

export default function TermsPage() {
  return (
    <main className="min-h-screen py-16 lg:py-24">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 mt-10">
        <TermsContent />
      </div>
    </main>
  );
}

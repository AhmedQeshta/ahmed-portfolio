import { Metadata } from 'next';
import { siteUrl } from '@/features/shard/utils/url';
import AboutContent from '@/features/about/components/AboutContent';

export const metadata: Metadata = {
  title: 'About Me | Ahmed Qeshta',
  description:
    'Learn about Ahmed Qeshta, a software engineer specializing in web development, mobile applications, and modern technologies. Discover my background, skills, experience, and passion for creating innovative digital solutions.',
  keywords: [
    'Ahmed Qeshta',
    'software engineer',
    'web developer',
    'full stack developer',
    'portfolio',
    'about me',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About Me | Ahmed Qeshta',
    description:
      'Learn about Ahmed Qeshta, a software engineer specializing in web and mobile development',
    url: `${siteUrl}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Me | Ahmed Qeshta',
    description:
      'Learn about Ahmed Qeshta, a software engineer specializing in web and mobile development',
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

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16 lg:py-24">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 mt-10">
        <AboutContent />
      </div>
    </main>
  );
}

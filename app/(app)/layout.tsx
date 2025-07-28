import '@/app/globals.css';
import '@/app/work-slider.css';
import Footer from '@/features/shard/components/layout/Footer';
import Navbar from '@/features/navbar/components/Navbar';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import { linksApp } from '@/features/navbar/utils/navLinks';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || ''),
  title: 'Ahmed Qeshta - Software Engineer',
  description: 'Ahmed Qeshta - Software Engineer',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer',
    images: ['images/ahmed-qeshta-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer',
    images: ['images/ahmed-qeshta-og.png'],
    creator: '@ahmedqeshta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: process.env.SITE_URL || '',
  },
  manifest: '/manifest.json',
  creator: 'Ahmed Qeshta',
  publisher: 'Ahmed Qeshta',
  authors: [
    {
      name: 'Ahmed Qeshta',
      url: new URL(process.env.SITE_URL || ''),
    },
  ],
  applicationName: 'Ahmed Qeshta - Software Engineer',
  appleWebApp: {
    title: 'Ahmed Qeshta - Software Engineer',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrbBackground />
        <Navbar links={linksApp} />

        {children}
        <Footer />
      </body>
    </html>
  );
}

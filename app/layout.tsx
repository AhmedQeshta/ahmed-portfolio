import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: 'Ahmed Qeshta - Software Engineer',
  description: 'Ahmed Qeshta - Software Engineer',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer',
    images: ['/ahmed-qeshta-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer',
    images: ['/ahmed-qeshta-og.png'],
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
    canonical: process.env.NEXT_PUBLIC_URL || '',
  },
  manifest: '/manifest.json',
  creator: 'Ahmed Qeshta',
  publisher: 'Ahmed Qeshta',
  authors: [
    {
      name: 'Ahmed Qeshta',
      url: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
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
  maximumScale: 1,
  userScalable: false,
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
      <body>{children}</body>
    </html>
  );
}

import '@/app/globals.css';
import '@/app/work-slider.css';
import Footer from '@/features/shard/components/layout/Footer';
import Navbar from '@/features/navbar/components/Navbar';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import { linksApp } from '@/features/navbar/utils/navLinks';
import type { Metadata, Viewport } from 'next';

const siteUrl = process.env.SITE_URL || 'https://ahmedqeshta.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ahmed Qeshta - Software Engineer',
    template: '%s | Ahmed Qeshta',
  },
  description:
    'Experienced software engineer specializing in full-stack development, React, Node.js, and modern web technologies. View my portfolio of projects and professional experience.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Ahmed Qeshta',
  ],
  authors: [{ name: 'Ahmed Qeshta', url: siteUrl }],
  creator: 'Ahmed Qeshta',
  publisher: 'Ahmed Qeshta',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Ahmed Qeshta - Software Engineer',
    description:
      'Experienced software engineer specializing in full-stack development. View my portfolio and professional experience.',
    images: [
      {
        url: '/images/ahmed-qeshta-og.png',
        width: 1200,
        height: 630,
        alt: 'Ahmed Qeshta - Software Engineer',
      },
    ],
    siteName: 'Ahmed Qeshta Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Experienced software engineer specializing in full-stack development.',
    images: ['/images/ahmed-qeshta-og.png'],
    creator: '@ahmedqeshta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  applicationName: 'Ahmed Qeshta Portfolio',
  appleWebApp: {
    title: 'Ahmed Qeshta',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  other: {
    'theme-color': '#0f172a',
    'color-scheme': 'dark',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'dark light',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="antialiased">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        {/* Background component - defer to improve LCP */}
        <OrbBackground />

        {/* Navigation */}
        <Navbar links={linksApp} />

        {/* Main content */}
        <main id="main-content" role="main">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

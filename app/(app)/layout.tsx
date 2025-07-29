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
    'Portfolio',
    'Web Development',
    'Frontend',
    'Backend',
  ],
  authors: [{ name: 'Ahmed Qeshta', url: siteUrl }],
  creator: 'Ahmed Qeshta',
  publisher: 'Ahmed Qeshta',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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
        alt: 'Ahmed Qeshta - Software Engineer Portfolio',
        type: 'image/png',
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
    site: '@ahmedqeshta',
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
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'Ahmed Qeshta Blog RSS Feed' }],
    },
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
    'color-scheme': 'dark light',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0f172a',
    'msapplication-config': '/browserconfig.xml',
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
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Critical resource hints for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Critical inline CSS to prevent FOUC */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            html { visibility: hidden; opacity: 0; }
            html.wf-active { visibility: visible; opacity: 1; }
            body { 
              background: linear-gradient(to right, #0f172a, #581c87, #0f172a);
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
            }
          `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        {/* Background component - optimized loading */}
        <OrbBackground />

        {/* Navigation with proper structure */}
        <Navbar links={linksApp} />

        {/* Main content wrapper with semantic structure */}
        <main id="main-content" role="main" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Non-critical JavaScript - loaded at the end */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              // Mark HTML as ready for CSS
              document.documentElement.classList.add('wf-active');
              
              // Service worker registration (if available)
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Preload next page on hover
              document.addEventListener('mouseover', function(e) {
                if (e.target.tagName === 'A' && e.target.href && !e.target.dataset.preloaded) {
                  e.target.dataset.preloaded = 'true';
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = e.target.href;
                  document.head.appendChild(link);
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

import '@/app/globals.css';
import '@/app/work-slider.css';
import Footer from '@/features/shard/components/layout/Footer';
import Navbar from '@/features/navbar/components/Navbar';
import FloatingActions from '@/features/shard/components/ui/FloatingActions';
import PWAInstallPrompt from '@/features/shard/components/ui/PWAInstallPrompt';
import { ThemeProvider } from '@/features/theme/context/ThemeContext';
import { linksApp } from '@/features/navbar/utils/navLinks';
import { metadata, viewport } from '@/features/shard/utils/metadata';
import Script from 'next/script';
import { Suspense } from 'react';
import { Providers } from '@/features/shard/components/ui/providers';
import PageViewTracker from '@/features/shard/components/ui/PageViewTracker';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google reCAPTCHA v3 script - loads lazily for performance */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="lazyOnload"
          />
        )}
        <Providers>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            {/* <OrbBackground /> */}
            <Navbar links={linksApp} />

            {children}
            <FloatingActions />
            <PWAInstallPrompt />
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

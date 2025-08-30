import '@/app/globals.css';
import '@/app/work-slider.css';
import Footer from '@/features/shard/components/layout/Footer';
import Navbar from '@/features/navbar/components/Navbar';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import FloatingActions from '@/features/shard/components/ui/FloatingActions';
import PWAInstallPrompt from '@/features/shard/components/ui/PWAInstallPrompt';
import { ThemeProvider } from '@/features/theme/context/ThemeContext';
import { linksApp } from '@/features/navbar/utils/navLinks';
import { metadata, viewport } from '@/features/shard/utils/metadata';
import Script from 'next/script';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <OrbBackground />
          <Navbar links={linksApp} />

          {children}
          <FloatingActions />
          <PWAInstallPrompt />
          <Footer />
          <Script src="/sw-register.js" strategy="afterInteractive" />
        </ThemeProvider>
      </body>
    </html>
  );
}

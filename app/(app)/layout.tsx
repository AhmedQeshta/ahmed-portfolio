import '@/app/globals.css';
import '@/app/work-slider.css';
import Footer from '@/features/shard/components/layout/Footer';
import Navbar from '@/features/navbar/components/Navbar';
import FloatingActions from '@/features/shard/components/ui/FloatingActions';
import PWAInstallPrompt from '@/features/shard/components/ui/PWAInstallPrompt';
import { ThemeProvider } from '@/features/theme/context/ThemeContext';
import { linksApp } from '@/features/navbar/utils/navLinks';
import { metadata, viewport } from '@/features/shard/utils/metadata';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {/* <OrbBackground /> */}
          <Navbar links={linksApp} />

          {children}
          <FloatingActions />
          <PWAInstallPrompt />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

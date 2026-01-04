import '@/app/globals.css';
import Navbar from '@/features/navbar/components/Navbar';
import { ThemeProvider } from '@/features/theme/context/ThemeContext';
import { linksPages } from '@/features/navbar/utils/navLinks';
import FloatingActions from '@/features/shard/components/ui/FloatingActions';
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
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <Navbar links={linksPages} />
          {children}

          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}

import '@/app/globals.css';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import OrbBackground from '@/components/OrbBackground';
import { linksApp } from '@/utils/navLinks';

export { metadata, viewport } from '@/utils/metaData';

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

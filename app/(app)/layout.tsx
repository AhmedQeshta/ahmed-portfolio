import '@/app/globals.css';
import '@/app/work-slider.css';
import Footer from '@/features/shard/components/layout/Footer';
import Navbar from '@/features/navbar/components/Navbar';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import { linksApp } from '@/features/navbar/utils/navLinks';

export { metadata, viewport } from '@/features/shard/utils/metaData';

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

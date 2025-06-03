import '@/app/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import OrbBackground from '@/components/OrbBackground';

export { metadata, viewport } from '@/libs/metaData';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrbBackground />
        <Navbar />

        {modal}
        {children}
        <Footer />
      </body>
    </html>
  );
}

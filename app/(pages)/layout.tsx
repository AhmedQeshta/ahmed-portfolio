import '@/app/globals.css';
import Navbar from '@/components/Layout/Navbar';
import OrbBackground from '@/components/ui/OrbBackground';
import { linksPages } from '@/utils/navLinks';

export { metadata, viewport } from '@/utils/metaData';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrbBackground />

        <Navbar links={linksPages} />
        {children}
      </body>
    </html>
  );
}

import '@/app/globals.css';
import Navbar from '@/features/shard/components/layout/Navbar';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import { linksPages } from '@/features/shard/utils/navLinks';

export { metadata, viewport } from '@/features/shard/utils/metaData';

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

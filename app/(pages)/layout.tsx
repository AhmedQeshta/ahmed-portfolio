import '@/app/globals.css';
import Navbar from '@/features/navbar/components/Navbar';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import { linksPages } from '@/features/navbar/utils/navLinks';
import FloatingActions from '@/features/shard/components/ui/FloatingActions';
import { metadata, viewport } from '@/features/shard/utils/metadata';

export { metadata, viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrbBackground />

        <Navbar links={linksPages} />
        {children}

        <FloatingActions />
      </body>
    </html>
  );
}

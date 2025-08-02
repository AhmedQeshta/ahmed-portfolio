import '@/app/globals.css';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';
import { metadata, viewport } from '@/features/shard/utils/metadata';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrbBackground />

        {children}
      </body>
    </html>
  );
}

import '@/app/globals.css';
import OrbBackground from '@/features/shard/components/ui/OrbBackground';

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

        {children}
      </body>
    </html>
  );
}
